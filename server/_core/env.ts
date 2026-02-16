export const ENV = {
  cookieSecret: process.env.JWT_SECRET ?? "dockly-default-secret-change-me",
  databaseUrl: process.env.DATABASE_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "admin",
  isProduction: process.env.NODE_ENV === "production",
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  openaiBaseUrl: process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1",
  adminEmail: process.env.ADMIN_EMAIL ?? "admin@dockly.app",
  adminPassword: process.env.ADMIN_PASSWORD ?? "admin123",
};
