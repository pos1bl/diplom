import { AxiosResponse } from 'axios';
import $api from "../http";
import { IUser } from '@models/IUser';
import { IFetchSpecialistResponse, IFetchSpecialistsResponse } from '@models/response/SpecialistsResponse';

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

  static async fetchSpecialists(filters: Record<string,string>): Promise<IFetchSpecialistsResponse> {
    const { data } = await $api.get<IFetchSpecialistsResponse>('specialists', { params: filters });
  
    return data;
  }

  static async fetchSpecialist(specialistId: string, userId: string): Promise<IFetchSpecialistResponse> {
    const { data } = await $api.get<IFetchSpecialistResponse>(`specialists/${specialistId}`, { params: { userId } });
  
    return data;
  }
}
