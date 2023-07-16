import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DevicesRepository } from './devices.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([DevicesRepository]), AuthModule],
  providers: [DevicesService, DevicesRepository],
  controllers: [DevicesController],
})
export class DeviceModule {}
