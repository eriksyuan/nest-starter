import { Expose } from 'class-transformer';

export class UserOutputDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  createdAt: number;

  @Expose()
  updatedAt: number;
}
