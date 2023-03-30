import { Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) // private readonly configService: ConfigService,
  {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  someError() {
    throw new NotFoundException('zhaobudao');
  }
}
