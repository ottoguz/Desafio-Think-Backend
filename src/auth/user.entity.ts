/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccountTypeEnum } from "./account-type.enum";
import { Device } from "src/device/device.entity";

@Entity()
export class User {
  // Primary key
  @PrimaryGeneratedColumn('uuid')  
  id: string;
  
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
  
  // Col: tipo de conta
  @Column()
  accountType: AccountTypeEnum;
  
  @OneToMany((_type) => Device, (device) => device.user, { eager: true })
  devices: Device[];
}