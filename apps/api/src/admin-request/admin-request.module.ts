import { Module } from '@nestjs/common';
import { AdminRequestController } from './admin-request.controller';
import { AdminRequestDao } from './admin-request.dao';
import { AdminRequestService } from './admin-request.service';

@Module({
  imports: [],
  controllers: [AdminRequestController],
  providers: [AdminRequestService, AdminRequestDao],
})
export class AdminRequestModule {}
