import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    return this.userService.validateUsernamePassword(username, password);
  }

  getAuthToken(user) {
    const payload = {
      id: user.id,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async login(user) {
    const token = this.getAuthToken(user);
    return {
      token,
    };
  }
}
