export interface AuthResponse {
  accessToken: string;
}

export interface AuthenticationProvider {
  auth(email: string): Promise<AuthResponse>
  verify(accessToken: string): Promise<boolean>
}
