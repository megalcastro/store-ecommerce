// services/paymentService.js
import axios from 'axios';
import { setLoading, setError, clearCart } from '../features/cart/cartSlice';

export const processPayment = async (dispatch, cart, customerId) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post('http://localhost:3000/orders', {
      customerId,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    });
    dispatch(clearCart());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
