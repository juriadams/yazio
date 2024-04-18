export interface Token {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
}

export interface Credentials {
  username: string;
  password: string;
}
