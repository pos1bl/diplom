import giftService from "../service/gift-service.js";

class GiftController {
  async createPaymentLink(req, res, next) {
    try {
      const { to, from, priceId, email, expirationDate } = req.body;
      const link = await giftService.createPaymentLink({ to, from, priceId, email, expirationDate })
      return res.json({ url: link.url });;
    } catch (e) {
      next(e);
    }
  }

  async handleWebhook(req, res, next) {
    const stripe = giftService.stripe;
    const sig = req.headers['stripe-signature'];
    
    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const { to, from, message, email, amount } = session.metadata;
        // …генеруємо PDF і відсилаємо лист…
      }
      
      return res.json({ received: true });
    } catch (e) {
      console.error('Webhook error:', e);
      res.status(400).send(`Webhook Error: ${e.message}`);
      next(e);
    }
  }
}

export default new GiftController();
