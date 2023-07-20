/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "src/device/device.entity";
import { SharedDevice } from "src/shared-devices/shared-device.entity";

@Entity()
export class User {
  // Primary key
  @PrimaryGeneratedColumn('uuid')  
  userId: string;
  
  // Col: nome
  @Column()
  firstName: string;
  
  // Col: sobrenome
  @Column()
  lastName: string;
  
  // Col: email(deve ser único)
  @Column({ unique: true})
  email: string;
  
  // Col: senha
  @Column()
  password: string;
  
  @OneToMany((_type) => Device, (device) => device.user, { eager: true })
  devices: Device[];

  @OneToMany((_type) => Device, (device) => device.user, { eager: true })
  sharedDevices: Device[];
}