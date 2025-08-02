export interface UserModel {
  name: string;
  email: string;
  password?: string; // Opcional, generalmente no se devuelve
  avatar: string;
  id?: number; // Agregar si el servidor lo proporciona
  username?: string; // Alias para name si es necesario
  isActive?: boolean; // Campos adicionales opcionales
  createdAt?: Date;
  updatedAt?: Date;
}
