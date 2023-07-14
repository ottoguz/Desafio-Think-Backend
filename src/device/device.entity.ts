/* eslint-disable prettier/prettier */
import { User } from 'src/auth/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DeviceEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  local: string;

  @Column()
  name: string;

  @Column()
  user: User;
}