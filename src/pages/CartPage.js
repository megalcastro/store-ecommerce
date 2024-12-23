import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { Table, Button, Card, Row, Col, Alert } from 'react-bootstrap';
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
    <div className="cart-page">
      <h1 className="text-center mb-4">Your Cart</h1>

      {/* Cart Table */}
      <Card className="mb-4">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">Your cart is empty!</td>
                </tr>
              ) : (
                cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>${parseFloat(item.price).toFixed(2)}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemove(item.id)}>Remove</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Clear Cart Button */}
      {cart.length > 0 && (
        <div className="d-flex justify-content-end mb-4">
          <Button variant="warning" onClick={handleClear}>Clear Cart</Button>
        </div>
      )}

      {/* Payment Summary */}
      <Card>
        <Card.Body>
          <h4>Payment Summary</h4>
          <Row>
            <Col xs={6}>Product Amount:</Col>
            <Col xs={6} className="text-right">${totalAmount.toFixed(2)}</Col>
          </Row>
          <Row>
            <Col xs={6}>Base Fee:</Col>
            <Col xs={6} className="text-right">${baseFee.toFixed(2)}</Col>
          </Row>
          <Row>
            <Col xs={6}>Delivery Fee:</Col>
            <Col xs={6} className="text-right">${deliveryFee.toFixed(2)}</Col>
          </Row>
          <hr />
          <Row>
            <Col xs={6}><strong>Total:</strong></Col>
            <Col xs={6} className="text-right"><strong>${(totalAmount + baseFee + deliveryFee).toFixed(2)}</strong></Col>
          </Row>
          <Button variant="primary" onClick={handleShowPaymentModal} className="w-100 mt-3">Proceed to Payment</Button>
        </Card.Body>
      </Card>

      {/* Payment Modal */}
      <PaymentModal
        show={showPaymentModal}
        handleClose={handleClosePaymentModal}
        handlePayment={handlePayment}
        totalAmount={totalAmount}
        baseFee={baseFee}
        deliveryFee={deliveryFee}
      />
      
      {/* Success Alert if cart is empty */}
      {cart.length === 0 && (
        <Alert variant="info" className="mt-4">
          Don't forget to check out our products and add them to your cart!
        </Alert>
      )}
    </div>
  );
};

export default CartPage;
