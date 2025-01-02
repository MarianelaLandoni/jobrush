export interface AuthBase {
  email: string;
  password: string;
}

export interface LoginRequest extends AuthBase {}

export interface AuthResponse {
  token: string;
  message: string;
}
