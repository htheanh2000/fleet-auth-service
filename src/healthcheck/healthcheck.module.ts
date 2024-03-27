import { Module } from '@nestjs/common';
import { HealthcheckController } from './healthcheck.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TerminusModule,
    HttpModule, // Add HttpModule here
    TypeOrmModule,
  ],
  controllers: [HealthcheckController]
})
export class HealthcheckModule {}
