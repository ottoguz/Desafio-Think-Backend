import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './typeorm-config/typeorm.config';
import { DeviceModule } from './device/devices.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(typeOrmConfig), DeviceModule],
})
export class AppModule {}
