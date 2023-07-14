// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Device } from './device.entity';
import { DeviceDto } from './dto/device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Device> {
    return this.devicesService.getDeviceById(id);
  }

  @Post('/create-device')
  createDevice(@Body() deviceDto: DeviceDto): Promise<void> {
    return this.devicesService.createDevice(deviceDto);
  }
}
