import axios, {AxiosResponse} from 'axios';
import {EndPoints} from '~/common/endPoints';
import {
  AddDriverBody,
  GetAllDriverResponse,
} from '~/common/models/driver.model';
import http from '~/services/AxiosService';
import {requestNavigateBack} from '~/services/NavigationService';

export const getALLDriver = async ({pageParam = 1}) => {
  try {
    const response = await http.get<GetAllDriverResponse>(
      `${EndPoints.LIST_DRIVER}?limit=7&page=${pageParam}`,
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error getALLDriver', error.response?.data);
      return error.response?.data;
    }
  }
};
export const addDriver = async (
  body: AddDriverBody,
): Promise<AxiosResponse<any, any> | undefined> => {
  try {
    const response = await http.post(EndPoints.ADD_DRIVER, body);
    requestNavigateBack();
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error addDriver', error.response?.data);
    }
  }
};
