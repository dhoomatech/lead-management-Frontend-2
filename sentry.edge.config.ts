/**
 * Sentry Edge Runtime Configuration
 * Minimal config for Next.js edge functions (middleware, edge API routes).
 * Note: Not all Sentry features are available in the edge runtime.
 */
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  // Edge runtime does not support profiling
});
