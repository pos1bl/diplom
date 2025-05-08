import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class GiftService {
  async createPaymentLink({ to, from, priceId, email, expirationDate }) {
    return await stripe.paymentLinks.create({
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      metadata: { to, from, email, expirationDate },
      after_completion: {
        type: 'redirect',
        redirect: { url: `${process.env.CLIENT_URL}/payment-success` }
      }
    });
  }
}

export default new GiftService();
