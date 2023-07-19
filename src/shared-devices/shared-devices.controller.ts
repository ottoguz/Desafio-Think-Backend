import { Controller, Post, Param, Body, Get, Patch } from '@nestjs/common';
import { SharedDevicesService } from './shared-devices.service';
import { Device } from 'src/device/device.entity';
import { SharedDevicesDto } from './dto/shared-devices.dto';
import { User } from 'src/auth/user.entity';
import { DeviceDto } from 'src/device/dto/device.dto';

@Controller('shared-devices')
export class SharedDevicesController {
  constructor(private sharedDevicesService: SharedDevicesService) {}
  @Get(':userId/devices/:deviceId')
  //@Post()
  async associateDeviceToUser(
    @Param('userId') userId: string,
    @Param('deviceId') deviceId: string,
  ): Promise<void> {
    await this.sharedDevicesService.associateDeviceToUser(userId, deviceId);
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
