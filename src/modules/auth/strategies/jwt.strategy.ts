import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { type Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { ConfigService } from "@/core/config/services/config.service";
import { UsersService } from "@/modules/users/services/users.service";

import { excludeFields } from "../utils";

interface RequestWithCookies extends Request {
  cookies: Record<string, string | undefined>;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: RequestWithCookies) => req?.cookies?.token ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("JWT_SECRET"),
    });
  }

  async validate(payload: { email: string; sub: string }) {
    const user = await this.usersService.findOne({ email: payload.email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return excludeFields(user, ["password"]);
  }
}
