/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { User } from "src/auth/user.entity";
import { SharingLevelEnum } from "../sharing-level.enum";

// Classe de transferência de dados do Dispositivo
export class DeviceDto {
  @IsString()
  type: string;

  @IsString()
  local: string;

  @IsString()
  name: string;

  @IsString()
  user: User;

  sharingLevel: SharingLevelEnum
}