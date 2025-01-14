import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Patch,
} from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';

@Controller('maintenance-requests')
export class MaintenanceRequestController {
  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService
  ) {
    //
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest
  ) {
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }

    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    if (!maintenanceRequest?.email) {
      throw new BadRequestException('Must provide Email');
    }
    if (!maintenanceRequest?.name) {
      throw new BadRequestException('Must provide Name');
    }

    if (!maintenanceRequest?.unitNumber) {
      throw new BadRequestException('Must provide Unit Number');
    }
    return await this.maintenanceRequestService.createMaintenanceRequest(
      maintenanceRequest
    );
  }

  @Get('/:id')
  public async getMaintenanceRequest(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.getMaintenanceRequest(id);
  }
  @Get('/')
  public async getMaintenanceRequests() {
    return await this.maintenanceRequestService.getMaintenanceRequests();
  }

  @Patch('/close/:id')
  public async closeRequest(@Param('id') id: string) {
    return await this.maintenanceRequestService.closeRequest(id);
  }
}
