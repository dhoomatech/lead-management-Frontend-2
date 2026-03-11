import { User, LoginCredentials, AuthResult } from "@/src/entities/models/User";
import { ValidationError, AuthenticationError } from "@/src/entities/errors/DomainErrors";
import { IAuthService } from "@/src/application/services/IAuthService";

export class LoginUseCase {
  constructor(private readonly authService: IAuthService) {}

  async execute(credentials: LoginCredentials): Promise<AuthResult> {
    const errors: Record<string, string> = {};
    if (!credentials.email?.trim()) errors.email = "Email is required";
    if (!credentials.password?.trim()) errors.password = "Password is required";
    if (Object.keys(errors).length > 0) throw new ValidationError(errors);

    return this.authService.login(credentials);
  }
}
