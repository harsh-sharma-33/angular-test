import { Injectable } from '@nestjs/common';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';
import Helper from '../Helper';
import { AdminRequest } from '@suiteportal/api-interfaces';

export interface AdminRequestDB extends AdminRequest {
  id: string;

  submittedAt: Date;
}

export interface AdminRequestData {
  admins: AdminRequestDB[];
}

const adapter = new FileSync<AdminRequestDB>('./db/admins.json');
const db = low(adapter);

db.defaultTo({
  admins: [],
}).write();

@Injectable()
export class AdminRequestDao {
  private get collection(): any {
    return db.get('admins');
  }

  constructor() {
    /**
     * Created a default admin for testing purpose
     */
    this.collection
      .push({
        id: nanoid.nanoid(52),
        email: 'sharmaharsh14102311@gmail.com',
        password: Helper.genPasswordSync('1234'),
        submittedAt: new Date(),
      })
      .write();
  }

  async insertNewRequest(adminRequest: AdminRequest) {
    const id = { id: nanoid.nanoid(52) };
    await this.collection
      .push({
        ...id,
        ...adminRequest,
        submittedAt: new Date(),
      })
      .write();
    return id;
  }

  async getAdminRequest(email: string): Promise<AdminRequestDB> {
    return await this.collection.find({ email }).value();
  }
}
