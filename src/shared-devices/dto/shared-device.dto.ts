/* eslint-disable prettier/prettier */
import { IsEnum, IsNumber, IsString } from "class-validator";
import { SharingLevelEnum } from "../sharing-level.enum";
import { SharedDevice } from "../shared-device.entity";

// Dto para transferência de dados para recursos
// de dispositvos compartilhados
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

    @IsNumber()
    sharedDeviceId: string;
    
    @IsEnum(SharedDevice)
    sharingLevel: SharingLevelEnum;
}
