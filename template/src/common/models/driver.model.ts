export interface Driver {
  id: number;
  userName: string;
  fullName: string;
  phoneNumber: string;
}

export interface GetAllDriverResponse {
  statusCode: number;
  message: string;
  data: Driver[];
  error: string;
}

export interface AddDriverBody extends Pick<Driver, 'userName' | 'fullName'> {}

export interface AddDriverResponse {
  statusCode: number;
  message: string;
  error: string;
}
