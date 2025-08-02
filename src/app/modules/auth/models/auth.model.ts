import { UserModel } from "./user.model";

export interface AuthModel {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
  expiresIn: number;
}
