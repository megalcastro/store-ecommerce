import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice'; // Asegúrate de importar la acción correcta

const PaymentModal = ({ show, handleClose, handlePayment, cartItem }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    deliveryAddress: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    handlePayment(paymentInfo);
    dispatch(clearCart()); // Limpiar el carrito después del pago
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleChange}
              placeholder="Enter card number"
            />
          </Form.Group>
          <Form.Group controlId="formExpirationDate">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control
              type="text"
              name="expirationDate"
              value={paymentInfo.expirationDate}
              onChange={handleChange}
              placeholder="MM/YY"
            />
          </Form.Group>
          <Form.Group controlId="formCvv">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handleChange}
              placeholder="Enter CVV"
            />
          </Form.Group>
          <Form.Group controlId="formDeliveryAddress">
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control
              type="text"
              name="deliveryAddress"
              value={paymentInfo.deliveryAddress}
              onChange={handleChange}
              placeholder="Enter delivery address"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Pay Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
