import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { SharedDevicesService } from './shared-devices.service';
import { User } from 'src/auth/user.entity';
import { Device } from 'src/device/device.entity';

@Controller('shared-devices')
export class SharedDevicesController {
  constructor(private readonly sharedDevicesService: SharedDevicesService) {}

  @Get()
  async associateDeviceToUser(
    @Param('userId') userId: string,
    @Param('deviceId') deviceId: string,
  ): Promise<void> {
    await this.sharedDevicesService.associateDeviceToUser(userId, deviceId);
  }

  @Delete(':userId/devices/:deviceId')
  async disassociateDeviceFromUser(
    @Param('userId') userId: string,
    @Param('deviceId') deviceId: string,
  ): Promise<void> {
    await this.sharedDevicesService.disassociateDeviceFromUser();
  }
}
