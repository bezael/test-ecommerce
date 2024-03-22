export interface User {
  email: string;
  password: string;
  name: string;
};


export interface UserResponse {
  access_token: string;
  message : string;
  refresh_token: string;
  status: string;
  user: User;
};