import {
  CurrentUserResponse,
  LoginBody,
  LoginResponse,
} from '~/common/models/auth.model';
import {EndPoints} from '~/common/endPoints';
import axios from 'axios';
import Storage from '~/utils/storage';
import {Config} from '~/config';
import CryptoJS from 'crypto-js';
import http from '~/services/AxiosService';
import {store} from '~/common/reduxs/store';
import {
  hideLoading,
  showLoading,
} from '~/common/reduxs/reducers/common.reducer';

export const login = async (loginBody: LoginBody) => {
  store.dispatch(showLoading());
  try {
    const response = await http.post<LoginResponse>(EndPoints.LOGIN, loginBody);
    store.dispatch(hideLoading());
    await Storage.setItem('token', response.data.data.accessToken);
    await Storage.setItem('refreshToken', response.data.data.refresherToken);
    return response.data;
  } catch (error) {
    store.dispatch(hideLoading());
    if (axios.isAxiosError(error)) {
      console.log('error login', error.response?.data);
      return error.response?.data;
    }
  }
};

export const refreshTokenApi = async () => {
  try {
    const hashInfo = await Storage.getItem('hashInfo');
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify([
        hashInfo?.idUser,
        hashInfo?.idCompany,
        hashInfo?.userName,
      ]),
      Config.CRYPTO_SECRET_KEY,
    ).toString();

    const refreshToken = await Storage.getItem('refreshToken');
    // console.log('refreshToken', encryptedData);
    const response = await http.post(
      EndPoints.REFRESH_TOKEN,
      {
        encryptedData,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );
    console.log('response refreshToken', response.data);
    //await saveToLocal(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error refreshToken', error.response?.data);
      return error.response?.data;
    }
  }
};

export const getCurrentUser = async () => {
  try {
    // await refreshTokenApi();
    const response = await http.get<CurrentUserResponse>(
      EndPoints.CURRENT_USER,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error getCurrentUser', error.response?.data);
      return error.response?.data;
    }
  }
};
