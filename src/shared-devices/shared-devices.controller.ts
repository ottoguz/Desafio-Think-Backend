import { Controller, Post, Param, Body, Get, Patch } from '@nestjs/common';
import { SharedDevicesService } from './shared-devices.service';
import { SharedDeviceDto } from './dto/shared-device.dto';

@Controller('shared-devices')
export class SharedDevicesController {
  constructor(private sharedDevicesService: SharedDevicesService) {}
  @Post('/share-device')
  async shareDeviceToUser(
    @Body() sharedDeviceDto: SharedDeviceDto,
  ): Promise<void> {
    await this.sharedDevicesService.shareDeviceToUser(sharedDeviceDto);
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
