import { loadStripe } from "@stripe/stripe-js";

let stripePromise = null;

let stripePubKey =
  "pk_live_51PY3CdKP97Udb3XZLSFvUiRK4KyEeizLRBmWHKlRQ2jXzkEk9MWjxdQbu4DT3Q9xEMzKWaeQSmFMKVfiXAr5FNhL00MlsAGBYO";

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePubKey);
  }
  return stripePromise;
};

export async function checkout({ lineItems }) {
  console.log(lineItems);
  const stripe = await getStripe();
  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
}
