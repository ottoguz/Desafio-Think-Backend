/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { SharedDevicesService } from './shared-devices.service';
import { SharedDeviceDto } from './dto/shared-device.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';
import { SharedDevice } from './shared-device.entity';
import { SharedDeviceFilterDto } from './dto/shared-device-filter.dto';


@Controller('shared-devices')
@UseGuards(AuthGuard())
export class SharedDevicesController {
  constructor(private sharedDevicesService: SharedDevicesService) {}

  // Método: Recupera todos dispositivos pertencentes a um usuário
  @Get()
  getSharedDevices(
    @Query() sharedDeviceFilterDto: SharedDeviceFilterDto,
    @GetUser() user: User,
  ): Promise<SharedDevice[]> {
    /*
    this.logger.verbose(
      `User: "${user.email}" retrieving all devices .Filters: ${JSON.stringify(
        sharedDeviceDto,
      )}`,
    );*/
    return this.sharedDevicesService.getSharedDevices(sharedDeviceFilterDto, user);
  }
  @Post('/share-device')
  async shareDeviceToUser(
    @Body() sharedDeviceDto: SharedDeviceDto): Promise<void> {
     return await this.sharedDevicesService.shareDeviceToUser(sharedDeviceDto);
  }
  
  @Post('/disassociate-device')
  async disassociateDeviceFromUser(
    @Body() sharedDeviceDto: SharedDeviceDto,
    @GetUser() user: User
    ): Promise<void> {
    return await this.sharedDevicesService.disassociateDeviceFromUser(sharedDeviceDto, user);
  }
}
