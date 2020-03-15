/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = environment.API_PREFIX;
  app.setGlobalPrefix(globalPrefix);
  const port = environment.API_PORT;
  const domain = environment.API_DOMAIN;
  await app.listen(port, () => {
    console.log(`Listening at http://${domain}:${port}/${globalPrefix}`);
  });
}

bootstrap();
