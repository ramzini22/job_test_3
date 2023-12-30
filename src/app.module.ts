import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseOrmConfig } from "./common/conf/database/postgres/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...BaseOrmConfig,
    }),

    AuthModule,
  ],
})
export class AppModule {}
