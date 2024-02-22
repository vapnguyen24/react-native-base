import axios, {AxiosInstance, AxiosRequestHeaders} from 'axios';
import Storage from '~/utils/storage';
import {Config} from '~/config';
import {EndPoints} from '~/common/endPoints';
import {refreshTokenApi} from '~/common/api/auth.api';

export class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: Config.BASE_URL,
      timeout: Config.API_TIMEOUT,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    this.instance.interceptors.request.use(
      async config => {
        // check login api and refresh token api not need token
        if (
          config.url === EndPoints.LOGIN ||
          config.url === EndPoints.REFRESH_TOKEN
        ) {
          return config;
        }

        const token = await Storage.getItem('token');
        config.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        } as AxiosRequestHeaders;

        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      res => res,
      async err => {
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const res = await refreshTokenApi();
          if (res.statusCode === 200) {
            //this.instance.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;
            await Storage.setItem('token', res.data.accessToken);
            await Storage.setItem('refreshToken', res.data.refresherToken);
            return this.instance(originalRequest);
          }
        }
        return Promise.reject(err);
      },
    );
  }
}

const http = new Http().instance;
export default http;
