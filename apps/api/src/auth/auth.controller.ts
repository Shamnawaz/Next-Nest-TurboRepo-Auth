import { 
  Body,
  Controller, 
  Get, 
  Post, 
  Request, 
  Res, 
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Response } from 'express';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registerUser(@Body() body: CreateUserDto) {
    return this.authService.registerUser(body);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Request() req) {
    return this.authService.login(req.user.id, req.user.name);
  }

  @Roles('ADMIN', 'EDITOR')
  @Get('protected')
  getAll(@Request() req) {
    return {message: `now you can access this protected API. this is your user ID: ${req.user.id}`};
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id, req.user.name);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    const response = await this.authService.login(req.user.id, req.user.name);
    res.redirect(`http://localhost:3000/api/auth/google/callback?userId=${response.id}&name=${response.name}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}`);
  }

  @Post('signout')
  signOut(@Request() req) {
    return this.authService.signOut(req.user.id);
  }
}
