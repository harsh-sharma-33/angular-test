import { Injectable } from '@nestjs/common';
import { AdminRequest } from '@suiteportal/api-interfaces';
import { AdminRequestDao, AdminRequestDB } from './admin-request.dao';

@Injectable()
export class AdminRequestService {
  constructor(private readonly maintReqDao: AdminRequestDao) {
    //
  }

  async createAdminRequest(AdminRequest: AdminRequest) {
    return await this.maintReqDao.insertNewRequest(AdminRequest);
  }

  async getAdminRequest(email: string): Promise<AdminRequestDB> {
    return await this.maintReqDao.getAdminRequest(email);
  }
}
