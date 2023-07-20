/* eslint-disable prettier/prettier */
import { Controller, Post, Param, Body, Get, Patch } from '@nestjs/common';
import { SharedDevicesService } from './shared-devices.service';
import { SharedDeviceDto } from './dto/shared-device.dto';
import { SharedDevice } from './shared-device.entity';

@Controller('shared-devices')
export class SharedDevicesController {
  constructor(private sharedDevicesService: SharedDevicesService) {}
  @Post('/share-device')
  async shareDeviceToUser(
    @Body() sharedDeviceDto: SharedDeviceDto, sharedDevice: SharedDevice,
  ): Promise<void> {
     return this.sharedDevicesService.shareDeviceToUser(sharedDeviceDto, sharedDevice);
  }
  /*
  @Delete(':userId/devices/:deviceId')
  async disassociateDeviceFromUser(
    @Param('userId') userId: string,
    @Param('deviceId') deviceId: string,
  ): Promise<void> {
    await this.sharedDevicesService.disassociateDeviceFromUser();
  }*/
}
