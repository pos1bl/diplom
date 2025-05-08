import { AxiosResponse } from 'axios';
import { PaymentResponse } from "@models/response/PaymentResponse";
import $api from "../http";
import { IGiftPayload } from '@models/IGiftPayload';

export default class GiftService {
  static async createGiftPaymentLink(payload: IGiftPayload): Promise<AxiosResponse<PaymentResponse>> {
    return $api.post('create_payment_link', { payload })
  }
}
