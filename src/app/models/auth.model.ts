export interface Auth {
  email: string;
  password: string;
}

export interface ResetPassword {
  resetPasswordId: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
}
