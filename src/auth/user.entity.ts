/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AccountTypeEnum } from "./account-type.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')  
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  accountType: AccountTypeEnum;
}