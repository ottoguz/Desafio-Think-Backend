/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { User } from "src/auth/user.entity";

// Classe de transferência de dados do Dispositivo
export class DeviceDto {
  @IsString()
  deviceId: string;

  @IsString()
  type: string;

  @IsString()
  local: string;

  @IsString()
  name: string;

  @IsString()
  user: User;
}