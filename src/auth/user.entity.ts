/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AccountTypeEnum } from "./account-type.enum";

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
}