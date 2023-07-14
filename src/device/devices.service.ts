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

  async getDeviceById(id: string): Promise<Device> {
    const foundDevice = await this.devicesRepository.findOneBy({ id });

    if (!foundDevice) {
      throw new NotFoundException();
    }
    return foundDevice;
  }

  async createDevice(deviceDto: DeviceDto): Promise<void> {
    return this.devicesRepository.createDevice(deviceDto);
  }

  async deleteDevice(id: string): Promise<void> {
    const result = await this.devicesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Device with ID: ${id} not found!`);
    }
  }
}
