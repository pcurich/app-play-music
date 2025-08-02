import { UserModel } from "./user.model";

export interface AuthModel {
  user: UserModel;
  tokenSession: string;
  expiresIn?: number; // Opcional para calcular expiración
}
