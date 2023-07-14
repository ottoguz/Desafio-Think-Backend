import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevicesRepository } from './devices.repository';
import { Device } from './device.entity';
import { DeviceDto } from './dto/device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DevicesRepository)
    private devicesRepository: DevicesRepository,
  ) {}

  // Método: faz conexão com o repositório para buscar dispositivos
  // em um array de dispositivos
  getDevices(deviceDto: DeviceDto): Promise<Device[]> {
    return this.devicesRepository.getDevices(deviceDto);
  }

  // Método: busca um dispositivo pelo "id"
  async getDeviceById(id: string): Promise<Device> {
    const foundDevice = await this.devicesRepository.findOneBy({ id });

    if (!foundDevice) {
      throw new NotFoundException();
    }
    return foundDevice;
  }

  // Método: transfere os dados de um novo dispositivo ao sistema
  // E cria um novo dispositivo para o repositório
  async createDevice(deviceDto: DeviceDto): Promise<void> {
    return this.devicesRepository.createDevice(deviceDto);
  }

  // Faz uma busca de um dispositivo pelo "id" no repositório e deleta
  async deleteDevice(id: string): Promise<void> {
    const result = await this.devicesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Device with ID: ${id} not found!`);
    }
  }
}
