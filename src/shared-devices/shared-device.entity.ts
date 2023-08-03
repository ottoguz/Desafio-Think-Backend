/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { SharingLevelEnum } from "./sharing-level.enum";
import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";

// Entidade intermediária que relaciona dispositivos e usuários
// faz o intermédio para a relação(many to many)
@Entity()
export class SharedDevice {
  @PrimaryGeneratedColumn('uuid')
  sharedDeviceId: string;

  @Column()
  deviceId: string;

  @Column()
  userId: string;

  // Col: tipo de dispositivo
  @Column()
  type: string;
  
  // Col: Local do dispositivo
  @Column()
  local: string;
  
  // Col:Nome do dispositivo
  @Column()
  name: string;

  @Column({default: 'OWNER'})
  sharingLevel: SharingLevelEnum;

  // Relação de many to one para (Um usuário para vários dispositivos)
  @ManyToOne((_type) => User, (user) => user.sharedDevices, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}