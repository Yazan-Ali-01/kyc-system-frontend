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
      },
    },
  },

  auth: {
    // Session duration in milliseconds (14 hours)
    sessionDurationMs:
      Number(import.meta.env.VITE_SESSION_DURATION_HOURS) *
      MINUTES_IN_HOUR *
      MILLISECONDS_IN_MINUTE,

    // Refresh token interval in milliseconds (30 minutes)
    refreshTokenIntervalMs:
      Number(import.meta.env.VITE_REFRESH_TOKEN_INTERVAL_MINUTES) *
      MILLISECONDS_IN_MINUTE,
  },

  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;
