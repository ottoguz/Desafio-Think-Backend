import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DevicesRepository } from './devices.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/auth/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DevicesRepository])],
  providers: [DevicesService, DevicesRepository, UsersRepository],
  controllers: [DevicesController],
})
export class DeviceModule {}
