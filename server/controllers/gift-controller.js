import giftService from "../service/gift-service.js";
import stripe from '../service/stripe-client.js';

class GiftController {
  async createPaymentLink(req, res, next) {
    try {
      const { payload } = req.body;
      const link = await giftService.createPaymentLink(payload);

      return res.json({ url: link.url });
    } catch (e) {
      next(e);
    }
  }

  async handleWebhook(req, res, next) {
    const sig = req.headers['stripe-signature'];
    
    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        await giftService.sendGift(session.metadata)
      }
      
      return res.json({ received: true });
    } catch (e) {
      next(e);
    }
  }
}

export default new GiftController();
