import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();
const config = defineConfig({
  schema: "./src/db/schema/Courseschema.js",
  out: "./src/db/migrations",
  // dialect: "postgresql",
  driver: "pg",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },

  verbose: true,
  strict: true,
});
export default config;
