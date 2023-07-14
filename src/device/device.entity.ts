/* eslint-disable prettier/prettier */
import { IsNotEmptyObject } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Device {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  local: string;

  @Column()
  name: string;

  @IsNotEmptyObject()
  user: User;
}