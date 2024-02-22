export interface LoginBody {
  username: string;
  password: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    refresherToken: string;
  };
  error: string;
  message: string;
  statusCode: number;
}

export interface CurrentUserResponse {
  data: {
    id: number;
    username: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    roles: string[];
    bankAccountNumber: string;
    bankName: string;
  };
  error: string;
  message: string;
  statusCode: number;
}

export interface AuthState {
  token?: string;
  user?: UserInfo;
}

export interface UserInfo {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  bankAccountNumber: string;
  bankName: string;
}
