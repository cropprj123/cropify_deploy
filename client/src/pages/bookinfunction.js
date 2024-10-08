// bookingFunctions.js

import axios from "axios";

import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe from stripe-js

// Load Stripe object with your publishable key
const stripePromise = loadStripe(
  "pk_test_51P5M6mSGhKrdHERp9543ZOQccbAjRceJSwRBsyFyvOOcqfVG8PZ0ubJlncjleiL7KdsjXdbPfcR6jA8AJ2GM1tB400VJslV0wX"
);

export const crop = async (id) => {
  try {
    // 1) Get checkout session from API
    //https://cropify-deploy-server.vercel.app/api/v1
    //`http://localhost:5173/api/v1/bookings/checkout-session/${id}`
    const response = await axios.get(
      `https://cropify-deploy-server.vercel.app/api/v1/bookings/checkout-session/${id}`
    );
    //real hai kya
    const sessionId = response.data.session.id;

    // 2) Create checkout form + change credit card
    const stripe = await stripePromise; // Await stripePromise to get the Stripe object
    await stripe.redirectToCheckout({
      sessionId: sessionId,
    });
  } catch (err) {
    //console.log(err);
  }
};
