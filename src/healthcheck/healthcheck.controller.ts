import { Controller, Get } from '@nestjs/common';
import {  HealthCheck, HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('healthcheck')
export class HealthcheckController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: TypeOrmHealthIndicator, // Inject HttpService
      ) {}
    
      @Get()
      @HealthCheck()
      async check() {
        return this.health.check([
          () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
          () => this.db.pingCheck('database'),
          // ... other health indicators
        ]);
      }

}
