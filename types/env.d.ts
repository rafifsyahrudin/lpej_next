declare namespace NodeJS {
  interface ProcessEnv {
    GCP_PROJECT_ID: string;
    GCP_CLIENT_EMAIL: string;
    GCP_PRIVATE_KEY: string;
    GCP_BUCKET_NAME: string;
  }
}
