/* eslint-disable prettier/prettier */
import { IsEnum, IsString } from "class-validator";
import { SharingLevelEnum } from "../sharing-level.enum";
import { SharedDevice } from "../shared-device.entity";

/* eslint-disable prettier/prettier */
export class SharedDeviceDto {
    @IsString()
    userId: string;

    @IsString()
    deviceId: string;
    
    @IsEnum(SharedDevice)
    sharingLevel: SharingLevelEnum;
}
