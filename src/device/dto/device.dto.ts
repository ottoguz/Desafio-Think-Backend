/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";
import { User } from "src/auth/user.entity";

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

  @IsString()
  @IsOptional()
  search?: string;
}