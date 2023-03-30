import { UsersService } from './users.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RegistryUserDto } from './dtos/registry-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/registry')
  registry(@Body() registryUserDto: RegistryUserDto) {
    return this.usersService.registryUser(registryUserDto);
  }
}
