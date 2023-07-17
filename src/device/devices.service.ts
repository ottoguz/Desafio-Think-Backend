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
  async getDeviceById(id: string, user: User): Promise<Device> {
    const foundDevice = await this.devicesRepository.findOneBy({ id, user });

    if (!foundDevice) {
      throw new NotFoundException();
    }
    return foundDevice;
  }

  // Método: transfere os dados de um novo dispositivo ao sistema
  // E cria um novo dispositivo para o repositório
  createDevice(deviceDto: DeviceDto, user: User): Promise<Device> {
    return this.devicesRepository.createDevice(deviceDto, user);
    console.log(user);
  }

  //Método: atualiza no repositório as informações atualizadas
  // de um dispositivo atrelado a um usuário
  async updateDevice(
    id: string,
    type: string,
    local: string,
    name: string,
    user: User,
  ): Promise<Device> {
    const device = await this.getDeviceById(id, user);
    device.type = type;
    device.local = local;
    device.name = name;

    await this.devicesRepository.save(device);
    return device;
  }

  // Faz uma busca de um dispositivo pelo "id" no repositório e deleta
  async deleteDevice(id: string, user: User): Promise<void> {
    const device = this.getDeviceById(id, user);
    if ((await device).sharingLevel === 'OWNER') {
      const result = await this.devicesRepository.delete({ id, user });
      if (result.affected === 0) {
        throw new NotFoundException(`Device with ID: ${id} not found!`);
      }
    } else {
      throw new UnauthorizedException(
        'This device can only be deleted by its owner!',
      );
    }
  }
}
