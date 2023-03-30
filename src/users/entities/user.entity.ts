import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Unique('username', ['username'])
  @Column({ length: 200 })
  username: string;

  @Exclude()
  @Column({ default: false, select: false })
  deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  encryptPwd() {
    this.password = hashSync(this.password, 10);
  }
}
