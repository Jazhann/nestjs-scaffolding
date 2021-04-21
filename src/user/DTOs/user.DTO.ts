export class UserDTO {
  email: string;
  password: string;
  phone: number;
  name: string;
  dni: string;
  city: string;
  birthDate: Date;
  registrationDate: Date;
  permissions: {
    admin: boolean;
  };
  isActive: boolean;
}
