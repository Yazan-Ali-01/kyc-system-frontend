interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SESSION_DURATION_HOURS: string;
  readonly VITE_REFRESH_TOKEN_INTERVAL_MINUTES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
