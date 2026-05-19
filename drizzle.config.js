import { defineConfig } from "drizzle-kit";
const config = defineConfig({
  dialect: "postgresql",
  schema: "./src/db/Courseschema.js",
  out: "./src/db/migrations",
  dbCredentials: {
    connectionString: process.env.DATA_BASE_URL,
  },
  verbose: true,
  strict: true,
});
export default config;