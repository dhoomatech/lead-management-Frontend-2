import { IAuthService } from "@/src/application/services/IAuthService";
import { LoginCredentials, AuthResult, User } from "@/src/entities/models/User";
import { AuthenticationError } from "@/src/entities/errors/DomainErrors";

const MOCK_USER: User = {
  id: 1,
  name: "Sneha Prakash",
  firstName: "Afthabu",
  lastName: "Rahman",
  email: "afthaburahman313@gmail.com",
  designation: "Manager",
  phone: "+91 8606200441",
  initials: "SP",
};

export class MockAuthService implements IAuthService {
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    // In production this would validate against a real backend
    if (!credentials.email || !credentials.password) {
      throw new AuthenticationError();
    }
    return { user: MOCK_USER, token: "mock-jwt-token-" + Date.now() };
  }

  async logout(): Promise<void> {
    // Clear session
  }

  async getCurrentUser(): Promise<User | null> {
    return MOCK_USER;
  }

  async validateToken(token: string): Promise<User | null> {
    if (token.startsWith("mock-jwt-token")) return MOCK_USER;
    return null;
  }
}
