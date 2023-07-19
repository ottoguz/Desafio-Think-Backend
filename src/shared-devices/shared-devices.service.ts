import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.entity';
import { Device } from 'src/device/device.entity';
import { DevicesService } from 'src/device/devices.service';
import { SharedDevicesDto } from './dto/shared-devices.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/auth/users.repository';
import { DevicesRepository } from 'src/device/devices.repository';
import { DeviceDto } from 'src/device/dto/device.dto';
import { use } from 'passport';

@Injectable()
export class SharedDevicesService {
  constructor(
    @InjectRepository(UsersRepository)
    @InjectRepository(DevicesRepository)
    private usersRepository: UsersRepository,
    private devicesRepository: DevicesRepository,
    private authService: AuthService,
    private devicesService: DevicesService,
  ) {}

  async associateDeviceToUser(userId: string, deviceId: string): Promise<User> {
    console.log(userId);
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId: userId })
      .getOne();
    /*  
    const device = await this.usersRepository
      .createQueryBuilder('devices')
      .where('user.devices = :devices', {
        deviceId: deviceId,
      })
      .getOne();*/
    console.log(user);
    //console.log(device);
    return user;
  }

  /*
  async disassociateDeviceFromUser(): Promise<void> {
    // Implemente a lógica para desassociar o dispositivo do usuário
  }*/
}
