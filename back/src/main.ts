import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.use(cors());
  app.use(morgan('dev')); // Puedes usar 'tiny', 'dev', o cualquier otro formato que desees.

  // Configura la carpeta 'uploads' como pública
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Configura la carpeta 'uploads' como pública
  app.useStaticAssets(join(__dirname, '..', '..', '_doc', 'html'), {
    prefix: '/',
  });

  await app.listen(3000);
  Logger.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
