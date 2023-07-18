import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.entity';
import { Device } from 'src/device/device.entity';
import { DevicesService } from 'src/device/devices.service';

@Injectable()
export class SharedDevicesService {
  constructor(
    private authService: AuthService,
    private devicesService: DevicesService,
  ) {}
  async associateDeviceToUser(userId: string, deviceId: string): Promise<void> {
    userId = 'bc26e4e9-0427-4118-8925-49f74b3d7ace';
    deviceId = '1';
    const recipient = this.authService.getUserById(userId);
    const sharedDevice = this.devicesService.getDeviceById(deviceId);
  }

  async disassociateDeviceFromUser(): Promise<void> {
    // Implemente a lógica para desassociar o dispositivo do usuário
  }
}
