/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { SharingLevelEnum } from 'src/device/sharing-level.enum';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: 'OWNER'})
  sharingLevel: SharingLevelEnum

  // Col:Usuário a quem o dispositivo pertence(Rel many to one)
  @ManyToMany((_type) => User, (user) => user.devices, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}