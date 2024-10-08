import { AdminRequest } from '@suiteportal/api-interfaces';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export default class Helper {
  // tokenSecret
  static tokenSecret = 'mysecretkeygoeshere';
  static genPasswordSync(pass: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
  }

  static comparePasswordSync(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static signToken(user: AdminRequest) {
    return jwt.sign({ user }, Helper.tokenSecret);
  }
}
