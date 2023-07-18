/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { User } from "src/auth/user.entity";
import { SharingLevelEnum } from "src/device/sharing-level.enum";

/* eslint-disable prettier/prettier */
export class SharedDevicesDto {
    userId: string;
    deviceId: string;
}
