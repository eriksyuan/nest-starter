import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegistryUserDto } from './dtos/registry-user.dto';
import { LoginOutputDto } from './dtos/login-output.dto';
import { UserOutputDto } from 'src/users/dtos/user-output.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({
    summary: '登录获取Token',
  })
  @ApiResponse({
    type: LoginOutputDto,
  })
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: '注册',
  })
  @ApiResponse({
    type: UserOutputDto,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/registry')
  registry(@Body() registryUserDto: RegistryUserDto) {
    return this.usersService.createUser(registryUserDto);
  }
}
