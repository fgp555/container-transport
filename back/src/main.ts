import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev')); // Puedes usar 'tiny', 'dev', o cualquier otro formato que desees.

  await app.listen(3000);
  Logger.log(`Application is running on: http://localhost:3000`);

}
bootstrap();
