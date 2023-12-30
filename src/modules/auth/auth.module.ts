import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { JwtService } from "@nestjs/jwt";
import { AuthUserRepository } from "./auth.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([AuthUserRepository])],
  // controllers: [AuthController],
  providers: [TokenService, JwtService],
})
export class AuthModule {}
