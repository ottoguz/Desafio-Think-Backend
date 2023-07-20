import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DevicesRepository } from './devices.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SharedDevicesModule } from 'src/shared-devices/shared-devices.module';
import { SharedDevicesRepository } from 'src/shared-devices/shared-devices.repository';
import { UsersRepository } from 'src/auth/users.repository';
import { SharedDevicesService } from 'src/shared-devices/shared-devices.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DevicesRepository]),
    AuthModule,
    SharedDevicesModule,
  ],
  providers: [
    DevicesService,
    DevicesRepository,
    SharedDevicesRepository,
    UsersRepository,
  ],
  controllers: [DevicesController],
})
export class DeviceModule {}
