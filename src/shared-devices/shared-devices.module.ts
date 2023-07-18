import { Module } from '@nestjs/common';
import { SharedDevicesController } from './shared-devices.controller';
import { SharedDevicesService } from './shared-devices.service';
import { UsersRepository } from 'src/auth/users.repository';
import { DevicesRepository } from 'src/device/devices.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceModule } from 'src/device/devices.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, DevicesRepository])],
  controllers: [SharedDevicesController],
  providers: [
    SharedDevicesService,
    UsersRepository,
    DevicesRepository,
    DeviceModule,
  ],
})
export class SharedDevicesModule {}
