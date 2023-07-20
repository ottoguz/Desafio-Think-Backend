import { Module } from '@nestjs/common';
import { SharedDevicesController } from './shared-devices.controller';
import { SharedDevicesService } from './shared-devices.service';
import { UsersRepository } from 'src/auth/users.repository';
import { DevicesRepository } from 'src/device/devices.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { DevicesService } from 'src/device/devices.service';
import { JwtService } from '@nestjs/jwt';
import { SharedDevicesRepository } from './shared-devices.repository';
import { SharedDevice } from './shared-device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, SharedDevice])],
  controllers: [SharedDevicesController],
  providers: [
    SharedDevicesService,
    AuthService,
    DevicesService,
    JwtService,
    UsersRepository,
    DevicesRepository,
    SharedDevicesRepository,
  ],
})
export class SharedDevicesModule {}
