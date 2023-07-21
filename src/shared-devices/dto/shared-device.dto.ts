/* eslint-disable prettier/prettier */
import { IsEnum, IsString } from "class-validator";
import { SharingLevelEnum } from "../sharing-level.enum";
import { SharedDevice } from "../shared-device.entity";

export class SharedDeviceDto {
    @IsString()
    type: string;

    @IsString()
    local: string;

    @IsString()
    name: string;

    @IsString()
    userId: string;

    @IsString()
    deviceId: string;
    
    @IsEnum(SharedDevice)
    sharingLevel: SharingLevelEnum;
}
