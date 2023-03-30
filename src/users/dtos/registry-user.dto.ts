import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegistryUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
