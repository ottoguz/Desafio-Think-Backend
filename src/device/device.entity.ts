/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  // Col:Usuário a quem o dispositivo pertence(Rel many to one)
  @ManyToOne((_type) => User, (user) => user.devices, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}