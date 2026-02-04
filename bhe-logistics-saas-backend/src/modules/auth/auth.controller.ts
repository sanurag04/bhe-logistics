import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterFranchiseUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register/franchise-user')
  async registerFranchiseUser(@Body() registerDto: RegisterFranchiseUserDto) {
    return this.authService.registerFranchiseUser(registerDto);
  }
}
