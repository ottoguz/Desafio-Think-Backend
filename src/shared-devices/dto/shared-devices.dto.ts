/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";
import { User } from "src/auth/user.entity";
import { SharingLevelEnum } from "src/device/sharing-level.enum";

/* eslint-disable prettier/prettier */
export class SharedDevicesDto {
    @IsString()
    @IsOptional()
    userId?: string;

    @IsString()
    @IsOptional()
    deviceId?: string;
}
