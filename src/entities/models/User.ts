export interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  phone: string;
  initials: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
  token: string;
}
