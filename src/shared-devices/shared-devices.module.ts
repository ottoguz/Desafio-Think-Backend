import { Module } from '@nestjs/common';
import { SharedDevicesController } from './shared-devices.controller';
import { SharedDevicesService } from './shared-devices.service';

@Module({
  controllers: [SharedDevicesController],
  providers: [SharedDevicesService]
})
export class SharedDevicesModule {}
