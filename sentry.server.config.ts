/**
 * sentry.server.config.ts
 * Initialises Sentry on the Node.js server runtime.
 */
import * as Sentry from "@sentry/nextjs";
import { SENTRY_DSN, IS_PRODUCTION, APP_VERSION } from "./config";

Sentry.init({
  dsn: SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: `dhooma-crm@${APP_VERSION}`,

  tracesSampleRate: IS_PRODUCTION ? 0.2 : 1.0,

  // Capture all unhandled promise rejections
  // captureUnhandledRejections: true,
});
