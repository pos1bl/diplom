import { AxiosResponse } from 'axios';
import $api from "../http";
import { Role } from '@models/IUser';
import { ISession } from '@models/ISession';

export default class SessionsService {
  static async fetchSessions(role: Role, userId: string, filters?: Record<string,string>): Promise<AxiosResponse<ISession[]>> {
    const prefix = role === Role.SPECIALIST ? 'specialists' : 'users';

    return $api.get<ISession[]>(`${prefix}/${userId}/sessions`, { params: filters });
  }
}
