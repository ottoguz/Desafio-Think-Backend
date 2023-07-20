/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevicesRepository } from './devices.repository';
import { Device } from './device.entity';
import { DeviceDto } from './dto/device.dto';
import { User } from 'src/auth/user.entity';
import { SharedDevicesRepository } from 'src/shared-devices/shared-devices.repository';
import { any } from '@hapi/joi';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DevicesRepository)
    private devicesRepository: DevicesRepository,
    private sharedDevicesRepository: SharedDevicesRepository
  ) {}
  
  // Método: faz conexão com o repositório para buscar dispositivos
  // em um array de dispositivos
  getDevices(deviceDto: DeviceDto, user: User): Promise<Device[]> {
    return this.devicesRepository.getDevices(deviceDto, user);
  }

  // Método: busca um dispositivo pelo "id"
  async getDeviceById(deviceId: string): Promise<Device> {
    const foundDevice = await this.devicesRepository.findOneBy({ deviceId });

    if (!foundDevice) {
      throw new NotFoundException();
    }
    return foundDevice;
  }

  // Método: transfere os dados de um novo dispositivo ao sistema
  // E cria um novo dispositivo para o repositório
  createDevice(deviceDto: DeviceDto, user: User): Promise<Device> {
    return this.devicesRepository.createDevice(deviceDto, user);
  }

  //Método: atualiza no repositório as informações atualizadas
  // de um dispositivo atrelado a um usuário
  async updateDevice(
    deviceId: string,
    type: string,
    local: string,
    name: string,
  ): Promise<Device> {
    const device = await this.getDeviceById(deviceId);
    const sharingLevel = this.sharedDevicesRepository.findOneBy({ deviceId })
    if ((await sharingLevel).sharingLevel === 'OWNER' || 
        (await sharingLevel).sharingLevel === 'EDITOR' && 
         device.deviceId === (await sharingLevel).deviceId) {
      device.type = type;
      device.local = local;
      device.name = name;
      await this.devicesRepository.save(device);
      return device;
    } else {
      throw new UnauthorizedException(
        'This device can only be edited by owners or editors!',
      );
    }
  }

   // Faz uma busca de um dispositivo pelo "id" no repositório e deleta
  async deleteDevice(deviceId: string, user: User): Promise<void> {
    const device = await this.getDeviceById(deviceId);
    const sharedDevice = await this.sharedDevicesRepository.findOneBy({ deviceId })
    console.log(sharedDevice.sharingLevel === 'OWNER' && sharedDevice.deviceId === deviceId ||
    sharedDevice.userId === device.user.userId)
    
    if (sharedDevice.sharingLevel === 'OWNER' && sharedDevice.deviceId === device.deviceId ||
        sharedDevice.sharingLevel === 'OWNER' && sharedDevice.userId === user.userId) {
      const result = await this.devicesRepository.delete(sharedDevice.deviceId);
      if (result.affected === 0) {
        throw new NotFoundException(`Device with ID: ${deviceId} not found!`);
      } 
    } else {
      throw new UnauthorizedException(
        'This device can only be deleted by its owner!',
      );
    }
  }
}
