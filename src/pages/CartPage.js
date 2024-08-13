import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { Table, Button } from 'react-bootstrap';
import PaymentModal from '../components/payment/PaymentModal';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleShowPaymentModal = () => setShowPaymentModal(true);
  const handleClosePaymentModal = () => setShowPaymentModal(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const totalAmount = calculateTotal();
  const baseFee = 5.00;
  const deliveryFee = 10.00;

  const handlePayment = (paymentInfo) => {
    console.log('Payment info:', paymentInfo);
    // Aquí puedes manejar el pago, como enviar la información al backend
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemove(item.id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="warning" onClick={handleClear}>Clear Cart</Button>
      <div>
        <h4>Payment Summary</h4>
        <p>Product Amount: ${totalAmount.toFixed(2)}</p>
        <p>Base Fee: ${baseFee.toFixed(2)}</p>
        <p>Delivery Fee: ${deliveryFee.toFixed(2)}</p>
        <p>Total: ${(totalAmount + baseFee + deliveryFee).toFixed(2)}</p>
        <Button variant="primary" onClick={handleShowPaymentModal}>Proceed to Payment</Button>
      </div>
      <PaymentModal
        show={showPaymentModal}
        handleClose={handleClosePaymentModal}
        handlePayment={handlePayment}
        totalAmount={totalAmount}
        baseFee={baseFee}
        deliveryFee={deliveryFee}
      />
    </div>
  );
};

export default CartPage;
