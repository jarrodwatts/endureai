import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null = null;

async function initializeStripe() {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }

  return stripePromise;
}

export default initializeStripe;
