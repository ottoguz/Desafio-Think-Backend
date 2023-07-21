/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Get, Query, Param, Patch, Delete } from '@nestjs/common';
import { SharedDevicesService } from './shared-devices.service';
import { SharedDeviceDto } from './dto/shared-device.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';
import { SharedDevice } from './shared-device.entity';
import { SharedDeviceFilterDto } from './dto/shared-device-filter.dto';
import { Device } from 'src/device/device.entity';


@Controller('shared-devices')
@UseGuards(AuthGuard())
export class SharedDevicesController {
  private logger = new Logger('SharedDevicesController');
  constructor(private sharedDevicesService: SharedDevicesService) {}

  // Método: Recupera todos dispositivos compartilhados entre usuários
  @Get()
  getSharedDevices(
    @Query() sharedDeviceFilterDto: SharedDeviceFilterDto,
    @GetUser() user: User,
  ): Promise<SharedDevice[]> {
    
    this.logger.verbose(
      `User: "${user.email}" retrieving all shared devices .Filters: ${JSON.stringify(
        sharedDeviceFilterDto,
      )}`,
    );
    return this.sharedDevicesService.getSharedDevices(sharedDeviceFilterDto, user);
  }

  // Método: busca um dispositivo compartilhado pelo campo "id"
  @Get('/:sharedDeviceId')
  getSharedDeviceById(@Param('sharedDeviceId') sharedDeviceId: string): Promise<SharedDevice> {
    return this.sharedDevicesService.getSharedDeviceById(sharedDeviceId);
  }

  // Método: rota para atualizar informações de um dispositivo
  // compartilhado entre usuários
  @Patch('/:sharedDeviceId/update-shared-device')
  updateSharedDevice(
    @Param('sharedDeviceId') sharedDeviceId: string,
    @Body() sharedDeviceDto: SharedDeviceDto,
  ): Promise<Device> {
    const { type, local, name } = sharedDeviceDto;
    return this.sharedDevicesService.updateSharedDevice(sharedDeviceId, type, local, name);
  }

  // Método: rota para deletar um dispositivo compartilhado
  @Delete('/:sharedDeviceId')
  deleteDevice(
    @Param('sharedDeviceId') sharedDeviceId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.sharedDevicesService.deleteSharedDevice(sharedDeviceId, user);
  }
  
  // Método: Rota para o compartilhamento de dispositivos entre usuários
  // pegando todas as suas informações(tipo, local, nome, etc...)
  @Post('/share-device')
  async shareDeviceToUser(
    @Body() sharedDeviceDto: SharedDeviceDto): Promise<void> {
     return await this.sharedDevicesService.shareDeviceToUser(sharedDeviceDto);
  }
  
  // Método: Rota para disassociar um dispositivo compartilihado de um usuário
  // É um metodo post porque não DELETA um dispositivo apenas remove o acesso
  // para a pessoa com quem compartilhou 
  @Post('/disassociate-device')
  async disassociateDeviceFromUser(
    @Body() sharedDeviceDto: SharedDeviceDto,
    @GetUser() user: User
    ): Promise<void> {
    return await this.sharedDevicesService.disassociateDeviceFromUser(sharedDeviceDto, user);
  }
}
