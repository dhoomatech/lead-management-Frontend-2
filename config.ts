/**
 * config.ts
 * Centralised application configuration.
 * All environment variables are validated and exported from here.
 * Import this wherever you need env values — never access process.env directly.
 */

function optional(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

// ─── Database ────────────────────────────────────────────────────────────────
export const DATABASE_URL = optional(
  "DATABASE_URL",
  "postgresql://postgres:password@localhost:5432/dhooma_crm"
);

// ─── Auth ────────────────────────────────────────────────────────────────────
export const NEXTAUTH_SECRET = optional("NEXTAUTH_SECRET", "dev-secret");
export const NEXTAUTH_URL    = optional("NEXTAUTH_URL", "http://localhost:3000");

// ─── Sentry ──────────────────────────────────────────────────────────────────
export const SENTRY_DSN = optional("SENTRY_DSN");

// ─── App ─────────────────────────────────────────────────────────────────────
export const IS_PRODUCTION  = process.env.NODE_ENV === "production";
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const APP_VERSION    = optional("APP_VERSION", "2.1.0");

// ─── Feature Flags ───────────────────────────────────────────────────────────
export const FEATURES = {
  USE_PRISMA:    optional("USE_PRISMA",    "false") === "true",
  ENABLE_SENTRY: !!optional("SENTRY_DSN") && IS_PRODUCTION,
} as const;
