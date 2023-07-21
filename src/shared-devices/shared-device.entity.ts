/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { SharingLevelEnum } from "./sharing-level.enum";

// Entidade intermediária que relaciona dispositivos e usuários
// faz o intermédio para a relação(many to many)
@Entity()
export class SharedDevice {
  @PrimaryGeneratedColumn()
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
}