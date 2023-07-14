/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";

export class DeviceFilterDto {

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  search?: string;
}