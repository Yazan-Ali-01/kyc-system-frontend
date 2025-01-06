const MINUTES_IN_HOUR = 60;
const MILLISECONDS_IN_MINUTE = 60 * 1000;

export const environment = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL,
    endpoints: {
      auth: {
        me: "/auth/me",
        login: "/auth/login",
        register: "/auth/register",
        logout: "/auth/logout",
        refresh: "/auth/refresh",
        sessions: "/auth/sessions",
        update: "/auth/update",
      },
      kyc: {
        submit: "/kyc/submit",
        details: "/kyc",
        pending: "/kyc/pending",
        stats: "/kyc/stats",
      },
      reports: {
        overview: "/reports/overview",
        timeline: "/reports/timeline",
        documents: "/reports/documents",
        geography: "/reports/geography",
        processingTime: "/reports/processing-time",
      },
    },
  },

  auth: {
    sessionDurationMs:
      Number(import.meta.env.VITE_SESSION_DURATION_HOURS) *
      MINUTES_IN_HOUR *
      MILLISECONDS_IN_MINUTE,

    refreshTokenIntervalMs:
      Number(import.meta.env.VITE_REFRESH_TOKEN_INTERVAL_MINUTES) *
      MILLISECONDS_IN_MINUTE,
  },

  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;
