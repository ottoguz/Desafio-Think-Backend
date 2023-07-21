/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { SharingLevelEnum } from "./sharing-level.enum";
import { User } from "src/auth/user.entity";
import { Device } from "src/device/device.entity";

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