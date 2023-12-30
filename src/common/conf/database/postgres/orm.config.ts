import { Envs } from "../../envs";
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";

export const BaseOrmConfig = {
  type: "postgres",
  host: Envs.PG_HOST,
  port: Envs.PG_PORT,
  username: Envs.PG_USERNAME,
  password: Envs.PG_PASSWORD,
  database: Envs.PG_DATABASE,
  entities: ["dist/**/*.entity.{ts,js}"],
  synchronize: false,
  verboseRetryLog: true,
  autoLoadEntities: true,
  logging: Envs.PG_LOGGING,
  migrations: ["dist/database/migrations/*.{ts,js}"],
  cli: {
    entitiesDir: "src/modules",
    migrationsDir: "src/database/migrations",
  },
  migrationsTableName: "migrations",
  metadataTableName: "migrations_typeorm_metadata",
  migrationsTransactionMode: "all",
  migrationsRun: Envs.PG_MIGRATIONS_RUN,
} as TypeOrmModuleOptions;
