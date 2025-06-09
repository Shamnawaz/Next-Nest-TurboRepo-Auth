import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import type { AuthJwtPayload } from "../types/auth-jwtPayload";
import { AuthService } from "../auth.service";
import refreshConfig from "../config/refresh.config";
import { Request } from "express";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    constructor(
        @Inject(refreshConfig.KEY) private refreshJwtConfiguration: ConfigType<typeof refreshConfig>,
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
            secretOrKey: refreshJwtConfiguration.secret!,
            ignoreExpiration: false,
            passReqToCallback: true // On peut passer l'objet Request en premier argument de la méthode validate (headers, body, cookies...)
        })
    }

    // request.user
    validate(req: Request, payload: AuthJwtPayload) {
        const userId = payload.sub;
        const refreshToken = req.body.refresh;

        return this.authService.validateRefreshToken(userId, refreshToken);
    }
}