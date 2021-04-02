import { Controller, Get, Param } from '@nestjs/common';
import { User } from './shared/types';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('contributions/:login')
  async getContributions(@Param('login') login: string) {
    return await this.appService.getContributions(login);
  }

  @Get('stats/:login')
  async getStats(@Param('login') login: string) {
    return await this.appService.getStats(login);
  }

  @Get('accesstoken/:code')
  async getAccessToken(@Param('code') code: string) {
    return await this.appService.getAccessToken(code);
  }
}
