/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { User } from "src/auth/user.entity";

export class DeviceDto {
  @IsString()
  type: string;

  @IsString()
  local: string;

  @IsString()
  name: string;

  @IsString()
  user: User;
}