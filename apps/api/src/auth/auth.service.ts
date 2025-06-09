import { 
    ConflictException, 
    Inject, 
    Injectable, 
    UnauthorizedException
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { hash, verify } from 'argon2';
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
        const hashedRefreshToken = await hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
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

    async validateRefreshToken(userId: number, refreshToken: string) {
        const user = await this.userService.findOne(userId);
        
        if(!user) throw new UnauthorizedException('User not found');
        if(!user.hashedRefreshToken) throw new UnauthorizedException('Refresh Token not found');
        
        const refreshTokenMatched = await verify(user.hashedRefreshToken, refreshToken);
        if(!refreshTokenMatched) throw new UnauthorizedException('Invalid Refresh Token');

        const currentUser = { id: user.id };
        return currentUser;
    }

    async refreshToken(userId: number, name: string) {
        const {accessToken, refreshToken} = await this.generateTokens(userId);
        const hashedRefreshToken = await hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);

        return {
            id: userId,
            name: name,
            accessToken,
            refreshToken
        }
    }

    async validateGoogleUser(googleUser: CreateUserDto) {
        const user = await this.userService.findByEmail(googleUser.email);
        if(user) return user;
        
        return await this.userService.create(googleUser);
    }

    signOut(userId: number) {
        return this.userService.updateHashedRefreshToken(userId, null)
    }
}
