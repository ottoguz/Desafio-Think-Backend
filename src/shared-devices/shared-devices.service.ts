import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.entity';
import { Device } from 'src/device/device.entity';
import { DevicesService } from 'src/device/devices.service';
import { SharedDevicesDto } from './dto/shared-devices.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/auth/users.repository';

@Injectable()
export class SharedDevicesService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private authService: AuthService,
    private devicesService: DevicesService,
  ) {}

  async associateDeviceToUser(
    sharedDevicesDto: SharedDevicesDto,
  ): Promise<Device> {
    const { userId, deviceId } = sharedDevicesDto;
    console.log(userId);
    return;
  }

  /*
  async disassociateDeviceFromUser(): Promise<void> {
    // Implemente a lógica para desassociar o dispositivo do usuário
  }*/
}
