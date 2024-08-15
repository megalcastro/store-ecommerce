// components/payment/PaymentModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { processPayment } from '../../services/paymentService';

const PaymentModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const isLoading = useSelector(state => state.cart.isLoading);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    deliveryInfo: '',
  });

  const handleChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    await processPayment(dispatch, cart, 1); // Usando un customerId ficticio por ahora
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="cardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card number"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="expirationDate">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM/YY"
              name="expirationDate"
              value={paymentInfo.expirationDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="cvv">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter CVV"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="deliveryInfo">
            <Form.Label>Delivery Information</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter delivery information"
              name="deliveryInfo"
              value={paymentInfo.deliveryInfo}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        {isLoading && <Spinner animation="border" />}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handlePayment} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Pay'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
