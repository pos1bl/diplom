import { AxiosResponse } from 'axios';
import $api from "../http";
import { Client, IUser } from '@models/IUser';


export default class SpecialistService {
  static async fetchClients(filters?: Record<string,string>): Promise<AxiosResponse<Client[]>> {
    return $api.get<Client[]>('clients', { params: filters });
  }

  static async fetchUserInfo(clientId: string): Promise<IUser> {
    const { data } = await $api.get<IUser>(`clients/${clientId}`);

    return data;
  }

  static async fetchClientsNames(): Promise<AxiosResponse<string[]>> {
    return $api.get<string[]>('clients/names');
  }
}
