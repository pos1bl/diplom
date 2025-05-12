import { AxiosResponse } from 'axios';
import $api from "../http";
import { IUser } from '@models/IUser';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('users');
  }

  static async changeName(userId: string, name: string): Promise<void> {
    return $api.post('change_name', { userId, name });
  }

  static async changeEmail(userId: string, email: string): Promise<void> {
    return $api.post('change_email', { userId, email });
  }

  static async changePassword(userId: string, curPass: string, newPass: string): Promise<void> {
    return $api.post('change_password', { userId, curPass, newPass });
  }
}
