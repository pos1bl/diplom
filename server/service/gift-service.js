import stripe from './stripe-client.js';
import GiftModel from "../models/gift-model.js";
import mailService from "./mail-service.js";
import UserModel from "../models/user-model.js";
import ApiError from "../exceptions/api-error.js";
import { v4 } from 'uuid';

async function generateUniqueCode() {
  for (let i = 0; i < 5; i++) {
    const code = v4().slice(0, 8).toUpperCase();
    const exists = await GiftModel.exists({ code });
    if (!exists) {
      return code;
    }
  }

  throw ApiError.BadRequest('Не вдалося згенерувати унікальний код, спробуйте пізніше');
}

class GiftService {
  async createPaymentLink(payload) {
    return stripe.paymentLinks.create({
      line_items: [{
        price: payload.priceId,
        quantity: 1
      }],
      metadata: payload,
      after_completion: {
        type: 'redirect',
        redirect: { url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}` }
      }
    });
  }

  async sendGift(payload) {
    const { to, from, email, amount, expirationDate, userId } = payload;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.BadRequest('Користувача з таким id не знайдено');
    }

    const code = await generateUniqueCode();

    await GiftModel.create({ to, from, email, amount, expirationDate, user, code });
    await mailService.sendGift({ to, from, email, amount, expirationDate, code }); 
  }
}

export default new GiftService();
