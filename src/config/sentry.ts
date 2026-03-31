import * as Sentry from "@sentry/node";
import { env } from "./env.js";

// Initialize once at startup so all downstream imports share the same client.
Sentry.init({
  dsn: env.SENTRY_DSN,
  // Keep high sampling in dev so it is easy to validate instrumentation.
  tracesSampleRate: 1.0,
  environment: env.NODE_ENV,
  release: "observability-lab@1.0.0",
  integrations: [Sentry.expressIntegration()],
});

export default Sentry;