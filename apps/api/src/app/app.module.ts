import { Module } from '@nestjs/common';
import { MaintenanceRequestModule } from '../maintenance-request/maintenance-request.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminRequestModule } from '../admin-request/admin-request.module';

@Module({
  imports: [MaintenanceRequestModule, AdminRequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
