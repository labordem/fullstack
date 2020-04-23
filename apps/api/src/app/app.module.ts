import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata'; // https://typegraphql.ml/docs/installation.html
import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.DB_DOMAIN,
      username: environment.DB_USER,
      database: environment.DB_NAME,
      port: environment.DB_PORT,
      password: environment.DB_PASSWORD,
      synchronize: true,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      debug: false,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
