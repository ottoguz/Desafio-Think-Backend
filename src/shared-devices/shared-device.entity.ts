/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { SharingLevelEnum } from "./sharing-level.enum";
import { User } from "src/auth/user.entity";
import { Device } from "src/device/device.entity";

@Entity()
export class SharedDevice {
  @PrimaryGeneratedColumn()
  public sharedDeviceId: string;

  @Column()
  public deviceId: string;

  @Column()
  public userId: string;

  @Column()
  public sharingLevel: SharingLevelEnum;

  @ManyToOne(() => Device, (device) => device.sharedDevice)
  public device: Device;

  @ManyToOne(() => User, (user) => user.sharedDevice)
  public user: User;
}