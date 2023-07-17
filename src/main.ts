import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transfrom.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
  const port = 3000;
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
