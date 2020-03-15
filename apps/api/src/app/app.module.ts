import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.DB_DOMAIN,
      username: environment.DB_USER,
      database: environment.DB_NAME,
      port: environment.DB_PORT,
      password: environment.DB_PASSWORD,
      synchronize: true,
      autoLoadEntities: true
    })
  ],
  controllers: [AppController]
})
export class AppModule {}
