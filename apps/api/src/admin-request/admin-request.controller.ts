import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Param,
  Header,
  UnauthorizedException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AdminRequest } from '@suiteportal/api-interfaces';
import { AdminRequestService } from './admin-request.service';
import { emit } from 'process';
import Helper from '../Helper';

@Controller('admin-requests')
export class AdminRequestController {
  constructor(private readonly adminRequestService: AdminRequestService) {
    //
  }

  @Post('/')
  public async createAdmin(@Body() adminRequest: AdminRequest) {
    if (!adminRequest?.email) {
      throw new BadRequestException('Must provide Email');
    }

    if (!adminRequest?.password) {
      throw new BadRequestException('Must provide password');
    }
    return await this.adminRequestService.createAdminRequest(adminRequest);
  }

  @Post('/login')
  public async loginAdmin(
    @Res() response: Response,
    @Body() adminRequest: AdminRequest
  ) {
    if (!adminRequest?.email) {
      throw new BadRequestException('Must provide Email');
    }

    if (!adminRequest?.password) {
      throw new BadRequestException('Must provide password');
    }
    const user = await this.adminRequestService.getAdminRequest(
      adminRequest.email
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (Helper.comparePasswordSync(adminRequest?.password, user?.password)) {
      return response.status(200).json({ token: Helper.signToken(user) });
    } else {
      throw new UnauthorizedException('Wrong email or password');
    }
  }

  @Get('/:id')
  public async getAdminRequest(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.adminRequestService.getAdminRequest(id);
  }
}
