import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_123");

export async function createPaymentIntent(amount, currency="zar", metadata={}) {
  return stripe.paymentIntents.create({ amount, currency, metadata });
}

export async function refundPayment(paymentIntentId, amount) {
  const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (!pi || !pi.charges.data[0]) throw new Error("Payment not found");
  return stripe.refunds.create({ charge: pi.charges.data[0].id, amount });
}
