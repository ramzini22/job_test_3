import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as process from "process";

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}
  public generateAccessToken(entity: object) {
    return this.jwtService.signAsync(entity, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_TIME,
    });
  }
  public generateRefreshToken(entity: object) {
    return this.jwtService.signAsync(entity, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_TIME,
    });
  }
  public isValidAccessToken(token: string) {
    try {
      return this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
    } catch (e) {
      return null;
    }
  }
  public isValidRefreshToken(token: string) {
    try {
      return this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (e) {
      return null;
    }
  }
}
