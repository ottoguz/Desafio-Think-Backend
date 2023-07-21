/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.entity';
import { Device } from 'src/device/device.entity';
import { DevicesService } from 'src/device/devices.service';
import { SharedDeviceDto } from './dto/shared-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/auth/users.repository';
import { DevicesRepository } from 'src/device/devices.repository';
import { DeviceDto } from 'src/device/dto/device.dto';
import { use } from 'passport';
import { Console } from 'console';
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

  // Método: faz conexão com o repositório para buscar dispositivos
  // em um array de dispositivos
  getSharedDevices(
    sharedDeviceFilterDto: SharedDeviceFilterDto,
    user: User,
  ): Promise<SharedDevice[]> {
    return this.sharedDevicesRepository.getSharedDevices(
      sharedDeviceFilterDto,
      user,
    );
  }

  // Método: busca um dispositivo pelo "id"
  async getSharedDeviceById(sharedDeviceId: string): Promise<SharedDevice> {
    const foundDevice = await this.sharedDevicesRepository.findOneBy({
      sharedDeviceId,
    });

    if (!foundDevice) {
      throw new NotFoundException();
    }
    return foundDevice;
  }

  //Método: atualiza no repositório as informações atualizadas
  // de um dispositivo atrelado a um usuário
  async updateSharedDevice(
    sharedDeviceId: string,
    type: string,
    local: string,
    name: string,
  ): Promise<Device> {
    const foundDevice = await this.devicesRepository.findOneBy({deviceId: sharedDeviceId})
    const foundSharedDevice = await this.sharedDevicesRepository.findOneBy({deviceId : sharedDeviceId})
    
    console.log(foundDevice.deviceId == foundSharedDevice.deviceId && foundSharedDevice.sharingLevel === 'OWNER' ||
    foundDevice.deviceId == foundDevice.deviceId && foundSharedDevice.sharingLevel === 'EDITOR')

    if (foundDevice.deviceId == foundSharedDevice.deviceId && foundSharedDevice.sharingLevel === 'OWNER' ||
        foundDevice.deviceId == foundDevice.deviceId && foundSharedDevice.sharingLevel === 'EDITOR') {

          const sharedDeviceUpdate = await this.sharedDevicesRepository.findOneBy({ deviceId: sharedDeviceId })
          sharedDeviceUpdate.type = type
          sharedDeviceUpdate.local = local
          sharedDeviceUpdate.name = name
          await this.sharedDevicesRepository.save(sharedDeviceUpdate);
          
          return this.devicesService.updateDevice(sharedDeviceId, type, local, name); 
        } else {
          throw new UnauthorizedException(`Only owners or editors can update devices`)
      }
  }

  async shareDeviceToUser(sharedDeviceDto: SharedDeviceDto): Promise<void> {
    return this.sharedDevicesRepository.shareDeviceToUser(sharedDeviceDto);
  }

  
  async disassociateDeviceFromUser(
    sharedDeviceDto: SharedDeviceDto,
    user: User,
  ): Promise<void> {
    const { deviceId } = sharedDeviceDto
    const foundDevice = await this.devicesRepository.findOneBy({ deviceId });
    user.devices.push(foundDevice);
    await this.usersRepository.save(user);
  }
}
