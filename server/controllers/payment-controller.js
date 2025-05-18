import giftService from "../service/gift-service.js";
import paymentService from "../service/payment-service.js";
import sessionService from "../service/session-service.js";
import stripe from '../service/stripe-client.js';

class PaymentController {
  async createPaymentLink(req, res, next) {
    try {
      const { payload, redirectLink } = req.body;
      const { type } = req.params
      const link = await paymentService.createPaymentLink({ ...payload, type, redirectLink, userId: req.user.id });

      return res.json({ url: link.url });
    } catch (e) {
      next(e);
    }
  }

  async handleWebhook(req, res, next) {
    const sig = req.headers['stripe-signature'];
    
    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

      if (event.type === 'checkout.session.completed' && event.data.object.metadata?.type === "gift") {
        const session = event.data.object;
        await giftService.sendGift(session.metadata)
      }

      if (event.type === 'checkout.session.completed' && event.data.object.metadata?.type === "session") {
        const session = event.data.object;
        await sessionService.createSession(session.metadata)
      }
      
      return res.json({ received: true });
    } catch (e) {
      next(e);
    }
  }
}

export default new PaymentController();
