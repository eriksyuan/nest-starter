import { UsersService } from './users.service';
import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserOutputDto } from './dtos/user-output.dto';

@ApiTags('user')
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: '获取用户信息',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserOutputDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getInfo(@Req() req) {
    return this.usersService.findUserById(req.user.id);
  }
}
