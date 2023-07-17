// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Device } from './device.entity';
import { DeviceDto } from './dto/device.dto';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';

@Controller('devices')
@UseGuards(AuthGuard())
export class DevicesController {
  private logger = new Logger('DevicesController');
  constructor(private devicesService: DevicesService) {}

  // Método: Recupera todos dispositivos pertencentes a um usuário
  @Get()
  getDevices(
    @Query() deviceDto: DeviceDto,
    @GetUser() user: User,
  ): Promise<Device[]> {
    this.logger.verbose(
      `User: "${user.email}" retrieving all devices .Filters: ${JSON.stringify(
        deviceDto,
      )}`,
    );
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
    this.logger.verbose(
      `User: "${user.email}" creating a new device .Data: ${JSON.stringify(
        deviceDto,
      )}`,
    );
    return this.devicesService.createDevice(deviceDto, user);
  }

  // Método: rota para atualizar informações de um dispositivo
  // atrelado a um id e um usuário
  @Patch('/:id/update-device')
  updateDevice(
    @Param('id') id: string,
    @Body() deviceDto: DeviceDto,
  ): Promise<Device> {
    const { type, local, name, user } = deviceDto;
    return this.devicesService.updateDevice(id, type, local, name, user);
  }

  // Método: rota para deletar um dispositivo do sistema identificando pelo "id"
  @Delete('/:id')
  deleteDevice(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.devicesService.deleteDevice(id, user);
  }
}
