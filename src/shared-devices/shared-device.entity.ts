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

  @Column()
  sharingLevel: SharingLevelEnum;

  //@ManyToOne(() => User, (user: User) => user.sharedDevice)
  //user: User[];

  //@ManyToOne(() => Device, (device: Device) => device.sharedDevice)
  //device: Device[];
}