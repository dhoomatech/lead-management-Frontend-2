/**
 * sentry.client.config.ts
 * Initialises Sentry on the client (browser) runtime.
 * This file is loaded by Next.js automatically when SENTRY_DSN is present.
 */
import * as Sentry from "@sentry/nextjs";
import { SENTRY_DSN, IS_PRODUCTION, APP_VERSION } from "./config";

Sentry.init({
  dsn: SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: `dhooma-crm@${APP_VERSION}`,

  // Performance monitoring
  tracesSampleRate: IS_PRODUCTION ? 0.2 : 1.0,

  // Session replay — only in production
  replaysSessionSampleRate: IS_PRODUCTION ? 0.1 : 0,
  replaysOnErrorSampleRate: IS_PRODUCTION ? 1.0 : 0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Ignore noisy errors
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "Non-Error promise rejection captured",
  ],
});
