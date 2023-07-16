import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/devices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (confService: ConfigService) => {
        return {
          type: 'postgres',
          entities: [join(__dirname, '../', '**', '*.entity.js')],
          autoLoadEntities: true,
          synchronize: true,
          host: confService.get('DB_HOST'),
          port: confService.get('DB_PORT'),
          username: confService.get('DB_USERNAME'),
          password: confService.get('DB_PASSWORD'),
          database: confService.get('DB_DATABASE'),
        };
      },
    }),
    DeviceModule,
  ],
})
export class AppModule {}
