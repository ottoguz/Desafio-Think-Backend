/* eslint-disable prettier/prettier */
import { User } from "src/auth/user.entity";

export class DeviceDto {
  id: string;
  type: string;
  local: string;
  name: string;
  user: User;
}