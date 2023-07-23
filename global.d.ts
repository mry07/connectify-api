namespace NodeJS {
  interface ProcessEnv {
    APP_SERVER_PORT: string;
    AUTH_SERVER_PORT: string;
    
    TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
  }
}
