export interface Register {
  userData: UserData;
  response: Response ;
}

export interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  profile?: string;
}

export interface Response {
  created_at: Date;
  email: string;
  family_name: string;
  name: string;
  nickname: string;
  picture: string;
  updated_at: Date;
  user_id: string;
  user_metadata: Metadata;
  identities: any;
}

export interface Metadata {
  CAP_UUID: string;
}

export interface RegisterJWT {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

