export interface AuthResponse {
  accessToken: string;
}

export interface AuthenticationProvider {
  auth(id: number): Promise<AuthResponse>
  verify(accessToken: string): Promise<boolean>
}
