import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/devices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { configValidationSchema } from './config.schema';
import { SharedDevicesModule } from './shared-devices/shared-devices.module';
//import { SharedDevicesModule } from './shared-devices/shared-devices.module';

@Module({
  imports: [
    // Configuração para elencar a concexão com banco de dados
    // Fazendo uso de diferentes ambientes(start:dev/start:debug/start:prod/test)
    // Vide arquivo package.json "scripts": {...}
    //OBS: param "cross-env" é necessário para que a conexão ocorra em ambientes Windows
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (confService: ConfigService) => {
        return {
          type: 'postgres',
          entities: [join(__dirname, '../', '**', '*.entity.js')],
          autoLoadEntities: true,
          synchronize: true,
          // Conexão com o banco de dados via variável de ambiente
          host: confService.get('DB_HOST'),
          port: confService.get('DB_PORT'),
          username: confService.get('DB_USERNAME'),
          password: confService.get('DB_PASSWORD'),
          database: confService.get('DB_DATABASE'),
        };
      },
    }),
    AuthModule,
    DeviceModule,
    SharedDevicesModule,
  ],
})
export class AppModule {}
