import { 
    ConflictException, 
    Inject, 
    Injectable, 
    UnauthorizedException
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject(refreshConfig.KEY) private readonly refreshConfiguration: ConfigType<typeof refreshConfig>
    ) {}

    async registerUser(body: CreateUserDto) {
        const user = await this.userService.findByEmail(body.email);
        if(user) throw new ConflictException('User Already Exist !')
        
        return this.userService.create(body);
    }

    async validateLocalUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if(!user) throw new UnauthorizedException('User not found');

        const isPasswordMatched = verify(user.password, password);
        if (!isPasswordMatched) throw new UnauthorizedException('Invalid Password');

        return { id: user.id, name: user.name };
    }

    // Responsable de la création du token jwt
    async login(userId: number, name: string) {
        const {accessToken, refreshToken} = await this.generateTokens(userId);

        return {
            id: userId,
            name: name,
            accessToken,
            refreshToken
        }
    }

    async generateTokens(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshConfiguration)
        ])

        return {
            accessToken, refreshToken
        }
    }

    async validateJwtUser(userId: number) {
        const user = await this.userService.findOne(userId);
        if(!user) throw new UnauthorizedException('User not found');

        const currentUser = { id: user.id };

        return currentUser;
    }
}
