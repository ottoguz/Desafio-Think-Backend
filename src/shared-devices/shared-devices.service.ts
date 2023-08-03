/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Device } from 'src/device/device.entity';
import { DevicesService } from 'src/device/devices.service';
import { SharedDeviceDto } from './dto/shared-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/auth/users.repository';
import { DevicesRepository } from 'src/device/devices.repository';
import { SharedDevicesRepository } from './shared-devices.repository';
import { SharedDevice } from './shared-device.entity';
import { SharedDeviceFilterDto } from './dto/shared-device-filter.dto';

@Injectable()
export class SharedDevicesService {
  constructor(
    @InjectRepository(UsersRepository)
    @InjectRepository(DevicesRepository)
    @InjectRepository(SharedDevicesRepository)
    private usersRepository: UsersRepository,
    private devicesRepository: DevicesRepository,
    private sharedDevicesRepository: SharedDevicesRepository,
    private devicesService: DevicesService,
  ) {}

  // Método: faz conexão com o repositório para buscar todos 
  // dispositivos compartilhados com o usuário
  getSharedDevices(
    sharedDeviceFilterDto: SharedDeviceFilterDto,
    user: User,
  ): Promise<SharedDevice[]> {
    return this.sharedDevicesRepository.getSharedDevices(
      sharedDeviceFilterDto,
      user,
    );
  }

  // Método: busca um dispositivo compartilhado pelo "id"
  async getSharedDeviceById(sharedDeviceId: string): Promise<SharedDevice> {
    const foundDevice = await this.sharedDevicesRepository.findOneBy({
      sharedDeviceId,
    });

    if (!foundDevice) {
      throw new NotFoundException();
    }
    return foundDevice;
  }

  // Método: atualiza no repositório as informações 
  // de um dispositivo compartilhado atrelado a um usuário
  // somente dispositivos compartilhados como OWNER ou EDITOR podem ser atualizados
  async updateSharedDevice(
    sharedDeviceId: string,
    type: string,
    local: string,
    name: string,
  ): Promise<Device> {
    //const foundDevice = await this.devicesRepository.findOneBy({deviceId: sharedDeviceId})
    const foundSharedDevice = await this.sharedDevicesRepository.findOneBy({ sharedDeviceId : sharedDeviceId })

    if (foundSharedDevice.sharedDeviceId == sharedDeviceId && foundSharedDevice.sharingLevel === 'OWNER' ||
        foundSharedDevice.sharedDeviceId == sharedDeviceId && foundSharedDevice.sharingLevel === 'EDITOR') {

          const sharedDeviceUpdate = await this.sharedDevicesRepository.findOneBy({ sharedDeviceId: sharedDeviceId })
          sharedDeviceUpdate.type = type
          sharedDeviceUpdate.local = local
          sharedDeviceUpdate.name = name
          await this.sharedDevicesRepository.save(sharedDeviceUpdate);
          return sharedDeviceUpdate; 
        } else {
          throw new UnauthorizedException(`Only owners or editors can update devices`)
      }
  }

  // Método: Faz uma busca de um dispositivo compartilhado pelo "id" no repositório e deleta
  // Apenas dispositivos compartilhados no nível de compartilhamento OWNER pode ser deletado
  async deleteSharedDevice(sharedDeviceId: string, _user: User): Promise<void> {
    try {
      //const foundDevice = await this.devicesRepository.findOneBy({deviceId: sharedDeviceId})
      const foundSharedDevice = await this.sharedDevicesRepository.findOneBy({ sharedDeviceId : sharedDeviceId })
     
      if (sharedDeviceId == foundSharedDevice.sharedDeviceId && foundSharedDevice.sharingLevel === 'OWNER') {
        //await this.devicesRepository.delete(sharedDeviceId);
        await this.sharedDevicesRepository.delete(sharedDeviceId);
      } 
    } catch (error) {
      throw new InternalServerErrorException()
    } 
  }
  
  // Método: camada de serviço que repassa os dados do dispositivo a ser
  // compartilhado para o repositório de dispositivos compartilhados
  async shareDeviceToUser(sharedDeviceDto: SharedDeviceDto): Promise<void> {
    return this.sharedDevicesRepository.shareDeviceToUser(sharedDeviceDto);
  }
}
