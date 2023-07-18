/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { SharingLevelEnum } from 'src/device/sharing-level.enum';
import { User } from 'src/auth/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


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

  @Column({ default: 'OWNER'})
  sharingLevel: SharingLevelEnum

  @ManyToOne((_type) => User, (user) => user.devices, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  // Col:Usuário a quem o dispositivo pertence(Rel many to one)
  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}