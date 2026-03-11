export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainError";
  }
}

export class LeadNotFoundError extends DomainError {
  constructor(id: number) {
    super(`Lead with id ${id} not found`);
    this.name = "LeadNotFoundError";
  }
}

export class TeamMemberNotFoundError extends DomainError {
  constructor(id: number) {
    super(`Team member with id ${id} not found`);
    this.name = "TeamMemberNotFoundError";
  }
}

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super(`Invalid email address: ${email}`);
    this.name = "InvalidEmailError";
  }
}

export class AuthenticationError extends DomainError {
  constructor() {
    super("Invalid email or password");
    this.name = "AuthenticationError";
  }
}

export class ValidationError extends DomainError {
  public readonly fields: Record<string, string>;
  constructor(fields: Record<string, string>) {
    super("Validation failed");
    this.name = "ValidationError";
    this.fields = fields;
  }
}
