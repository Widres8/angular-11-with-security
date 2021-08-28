export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  roles: Role[];
  fullName: string;
  admin: string;
}

export interface Role {
  id: number;
  name: string;
}
