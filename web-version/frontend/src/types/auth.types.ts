export interface User {
  id: string;
  username: string;
  creationDate: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends AuthCredentials {
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
