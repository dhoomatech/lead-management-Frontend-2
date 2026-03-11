import { LoginCredentials, AuthResult, User } from "@/src/entities/models/User";

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthResult>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  validateToken(token: string): Promise<User | null>;
}
