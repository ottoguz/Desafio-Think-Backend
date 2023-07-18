import { Controller, Post, Param } from '@nestjs/common';
import { SharedDevicesService } from './shared-devices.service';
import { Device } from 'src/device/device.entity';
import { SharedDevicesDto } from './dto/shared-devices.dto';

@Controller('shared-devices')
export class SharedDevicesController {
  constructor(private sharedDevicesService: SharedDevicesService) {}

  @Post()
  associateDeviceToUser(sharedDevicesDto: SharedDevicesDto): Promise<Device> {
    console.log(sharedDevicesDto);
    return this.sharedDevicesService.associateDeviceToUser(sharedDevicesDto);
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
