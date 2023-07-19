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

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DevicesRepository)
    private devicesRepository: DevicesRepository,
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
    device.type = type;
    device.local = local;
    device.name = name;

    await this.devicesRepository.save(device);
    return device;
  }

  // Faz uma busca de um dispositivo pelo "id" no repositório e deleta
  async deleteDevice(deviceId: string, user: User): Promise<void> {
    //const device = this.getDeviceById(deviceId);
    /*
    if ((await device).sharingLevel === 'OWNER') {
      const result = await this.devicesRepository.delete({ deviceId, user });
      if (result.affected === 0) {
        throw new NotFoundException(`Device with ID: ${deviceId} not found!`);
      }
    } else {
      throw new UnauthorizedException(
        'This device can only be deleted by its owner!',
      );
    }*/
    const result = await this.devicesRepository.delete({ deviceId, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Device with ID: ${deviceId} not found!`);
    } else {
      throw new UnauthorizedException(
        'This device can only be deleted by its owner!',
      );
    }
  }
}
