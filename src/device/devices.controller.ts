// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Device } from './device.entity';
import { DeviceDto } from './dto/device.dto';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('devices')
@UseGuards(AuthGuard())
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  // Método: Retorna um array de objetos(dispositivos) para busca
  @Get()
  getDevices(
    @Query() deviceDto: DeviceDto,
    @GetUser() user: User,
  ): Promise<Device[]> {
    return this.devicesService.getDevices(deviceDto, user);
  }

  // Método: busca um dispositivo pelo campo "id"
  @Get('/:id')
  getDeviceById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Device> {
    return this.devicesService.getDeviceById(id, user);
  }

  // Método: endpoint para a criação de um dispositivo nosistema
  @Post('/create-device')
  createDevice(
    @Body() deviceDto: DeviceDto,
    @GetUser() user: User,
  ): Promise<Device> {
    return this.devicesService.createDevice(deviceDto, user);
  }

  // Método: rota para deletar um dispositivo do sistema identificando pelo "id"
  @Delete('/:id')
  deleteDevice(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.devicesService.deleteDevice(id, user);
  }
}
