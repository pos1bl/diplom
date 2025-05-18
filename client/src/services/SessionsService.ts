import { AxiosResponse } from 'axios';
import $api from "../http";
import { Role } from '@models/IUser';
import { IFreeSessionPayload, IGiftSessionPayload, ISession, ISessionPayload } from '@models/ISession';
import { PaymentResponse } from '@models/response/PaymentResponse';
import { USER_PAGES } from '@utils/NavigationList';

export default class SessionsService {
  static async fetchSessions(role: Role, userId: string, filters?: Record<string,string>): Promise<AxiosResponse<ISession[]>> {
    const prefix = role === Role.SPECIALIST ? 'specialists' : 'users';

    return $api.get<ISession[]>(`${prefix}/${userId}/sessions`, { params: filters });
  }

  static async createSessionPaymentLink(payload: ISessionPayload): Promise<AxiosResponse<PaymentResponse>> {
    return $api.post('create_payment_link/session', { payload, redirectLink: USER_PAGES.SUCCESS_PAYMENT })
  }

  static async createFreeSession(payload: IFreeSessionPayload): Promise<AxiosResponse<PaymentResponse>> {
    return $api.post('create_session', { payload })
  }

  static async createGiftSession(payload: IGiftSessionPayload): Promise<AxiosResponse<PaymentResponse>> {
    return $api.post('create_session', { payload })
  }
}
