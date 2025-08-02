export interface UserModel {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
