import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1',
    database: 'fleet',
    entities: [User],
    autoLoadEntities: true
  }), HealthcheckModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
