import { Module } from '@nestjs/common';
import { SharedDevicesController } from './shared-devices.controller';
import { SharedDevicesService } from './shared-devices.service';
import { UsersRepository } from 'src/auth/users.repository';
import { DevicesRepository } from 'src/device/devices.repository';

@Module({
  controllers: [SharedDevicesController],
  providers: [SharedDevicesService, UsersRepository, DevicesRepository],
})
export class SharedDevicesModule {}
