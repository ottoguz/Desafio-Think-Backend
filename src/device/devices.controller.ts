// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Device } from './device.entity';
import { DeviceDto } from './dto/device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Get()
  getDevices(@Query() deviceDto: DeviceDto): Promise<Device[]> {
    return this.devicesService.getDevices(deviceDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Device> {
    return this.devicesService.getDeviceById(id);
  }

  @Post('/create-device')
  createDevice(@Body() deviceDto: DeviceDto): Promise<void> {
    return this.devicesService.createDevice(deviceDto);
  }

  @Delete('/:id')
  deleteDevice(@Param('id') id: string): Promise<void> {
    return this.devicesService.deleteDevice(id);
  }
}
