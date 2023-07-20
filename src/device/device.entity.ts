/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { SharingLevelEnum } from 'src/shared-devices/sharing-level.enum';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Device {
  // Primary key
  @PrimaryGeneratedColumn()
  deviceId: string;
  
  // Col: tipo de dispositivo
  @Column()
  type: string;
  
  // Col: Local do dispositivo
  @Column()
  local: string;
  
  // Col:Nome do dispositivo
  @Column()
  name: string;

  // Relação de many to one para (Um usuário para vários dispositivos)
  @ManyToOne((_type) => User, (user) => user.devices, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}