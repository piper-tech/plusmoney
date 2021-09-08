export interface AuthData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface AuthenticationProvider {
  auth(authData: AuthData): Promise<AuthResponse>
}
