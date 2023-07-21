/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";

// Transferência de filtros para o motor de busca de dispositivos
export class SharedDeviceFilterDto {

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  search?: string;
}