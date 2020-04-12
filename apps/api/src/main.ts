import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true }
  );
  const globalPrefix = environment.API_PREFIX;
  app.setGlobalPrefix(globalPrefix);
  const port = environment.API_PORT;
  const domain = environment.API_DOMAIN;
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at http://${domain}:${port}/${globalPrefix}`);
  });
}

bootstrap();
