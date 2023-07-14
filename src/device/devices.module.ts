import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DevicesRepository } from './devices.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DevicesRepository])],
  providers: [DevicesService, DevicesRepository],
  controllers: [DevicesController],
})
export class DeviceModule {}
