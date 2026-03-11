/**
 * instrumentation.ts
 * Next.js instrumentation hook — runs once at server startup.
 * Used here to initialise Sentry on the server runtime.
 * https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { SENTRY_DSN } = await import("./config");
    if (SENTRY_DSN) {
      await import("./sentry.server.config");
    }
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    const { SENTRY_DSN } = await import("./config");
    if (SENTRY_DSN) {
      await import("./sentry.edge.config");
    }
  }
}
