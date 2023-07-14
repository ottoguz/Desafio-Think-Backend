/* eslint-disable prettier/prettier */
import { IsNotEmptyObject } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Device {
  // Primary key
  @PrimaryGeneratedColumn()
  id: string;
  
  // Col: tipo de dispositivo
  @Column()
  type: string;
  
  // Col: Local do dispositivo
  @Column()
  local: string;
  
  // Col:Nome do dispositivo
  @Column()
  name: string;

  // Col:Usuário a quem o dispositivo pertence
  //@IsNotEmptyObject()
  user: User;
}