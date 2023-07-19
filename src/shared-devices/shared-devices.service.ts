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

  async shareDeviceToUser(sharedDeviceDto: SharedDeviceDto): Promise<void> {
    return this.sharedDevicesRepository.shareDeviceToUser(sharedDeviceDto);
  }

  /*
  async disassociateDeviceFromUser(): Promise<void> {
    // Implemente a lógica para desassociar o dispositivo do usuário
  }*/
}
