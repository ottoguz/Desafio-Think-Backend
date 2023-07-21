/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
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
  ) {}

  // Método: faz conexão com o repositório para buscar dispositivos
  // em um array de dispositivos
  getSharedDevices(sharedDeviceFilterDto: SharedDeviceFilterDto, user: User): Promise<SharedDevice[]> {
    return this.sharedDevicesRepository.getSharedDevices(sharedDeviceFilterDto, user);
  }

  async shareDeviceToUser(sharedDeviceDto: SharedDeviceDto): Promise<void> {
    return this.sharedDevicesRepository.shareDeviceToUser(sharedDeviceDto);
  }

  
  async disassociateDeviceFromUser(sharedDeviceDto: SharedDeviceDto, user: User): Promise<void> {
    const { deviceId } = sharedDeviceDto
    const foundDevice = await this.devicesRepository.findOneBy({ deviceId });
    user.devices.push(foundDevice);
    await this.usersRepository.save(user);
  }
}
