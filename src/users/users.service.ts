import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {} from 'nest-winston';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { RegistryUserDto } from '../auth/dtos/registry-user.dto';
import { plainToClass } from 'class-transformer';
import { compare } from 'bcrypt';
import { UserOutputDto } from './dtos/user-output.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(WINSTON_MODULE_PROVIDER)
    private logger: Logger,
  ) {}

  async createUser(registryUserDto: RegistryUserDto) {
    const { username, password, confirm_password } = registryUserDto;

    if (password !== confirm_password) {
      throw new BadRequestException('两次输入的密码不一致');
    }

    const user = new User();
    user.username = username;
    user.password = password;

    // const havedUser =
    const havedUser = await this.fingByUserName(username);

    if (havedUser) {
      throw new BadRequestException('用户名已存在');
    }

    try {
      const res = await this.usersRepository.save(user);
      return plainToClass(UserOutputDto, res, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async fingByUserName(name: string) {
    try {
      const user = await this.usersRepository.findOneBy({
        username: name,
      });
      return user;
    } catch (error) {}
  }

  async validateUsernamePassword(username: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
      select: ['password', 'id'],
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    const match = await compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('密码错误');
    }
    delete user.password;
    return user;
  }

  async findUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    console.log(user);
    return user;
  }
}
