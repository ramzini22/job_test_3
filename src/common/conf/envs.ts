import { config } from "dotenv";
import * as process from "process";

config();
export const Envs = {
  PORT: Number(process.env.APP_PORT ?? 4000),

  UPDATE_POSTS_TIME: Number(process.env.UPDATE_POSTS_TIME_SEC ?? 300),

  SWAGGER_HOSTS: [
    // hosts information
    {
      URL: `http://localhost:${process.env.APP_PORT ?? 4000}>`,
      DESCRIPTION: "localhost",
    },
  ],
  IS_WRITE_SWAGGER_CONFIG: true,

  // db
  PG_HOST: String(process.env.PG_HOST ?? "localhost"),
  PG_PORT: Number(process.env.PG_PORT ?? 5432),
  PG_USERNAME: String(process.env.PG_USERNAME ?? ""),
  PG_PASSWORD: String(process.env.PG_PASSWORD ?? ""),
  PG_DATABASE: String(process.env.PG_DATABASE ?? ""),
  PG_LOGGING: Boolean(process.env.PG_LOGGING ?? false),
  PG_MIGRATIONS_RUN: Boolean(process.env.PG_MIGRATIONS_RUN ?? false),

  // secret
};
