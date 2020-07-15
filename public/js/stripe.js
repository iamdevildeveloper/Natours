import axios from 'axios';
import { showAlert } from './alerts.js';

const stripe = Stripe(
  'pk_test_51H4rFuJMoK2Q7BWYTrSnEJZgyCagMLqgi1A96ox13iKPZM0QQ1hwlQw9HY7K0tesje6MMDDxygXdlYVMN9cTqbJ000aooY6ot8'
);

export const bookTour = async (tourId) => {
  try {
    // 1 Get checkout session from server
    const session = await axios(
      `http://127.0.0.1:7777/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2 Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
