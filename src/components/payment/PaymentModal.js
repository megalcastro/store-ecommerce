import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PaymentModal = ({ show, handleClose, handlePayment, totalAmount, baseFee, deliveryFee }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [cardType, setCardType] = useState('');

  const validateCardNumber = (number) => {
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/; // Visa cards start with 4
    const masterCardRegex = /^5[1-5][0-9]{14}$/; // MasterCard cards start with 51-55

    if (visaRegex.test(number)) {
      setCardType('Visa');
    } else if (masterCardRegex.test(number)) {
      setCardType('MasterCard');
    } else {
      setCardType('');
    }
  };

  const handleCardNumberChange = (e) => {
    const number = e.target.value;
    setCardNumber(number);
    validateCardNumber(number);
  };

  const handleSubmit = () => {
    const paymentInfo = {
      cardNumber,
      expiryDate,
      cvv,
      deliveryAddress,
    };

    handlePayment(paymentInfo);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Credit Card Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your card number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength="19" // Limit length to 19 characters (including spaces)
            />
            {cardType && (
              <div className="mt-2">
                <img
                  src={
                    cardType === 'Visa'
                      ? 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
                      : 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg'
                  }
                  alt={cardType}
                  style={{ height: '30px', marginTop: '10px' }}
                />
              </div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              maxLength="5" // Limit length to "MM/YY"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="4" // Limit length to 3 or 4 characters
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter delivery address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </Form.Group>

          <h4>Payment Summary</h4>
          <p>Product Amount: ${totalAmount}</p>
          <p>Base Fee: ${baseFee}</p>
          <p>Delivery Fee: ${deliveryFee}</p>
          <p>Total: ${(totalAmount + baseFee + deliveryFee).toFixed(2)}</p>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Pay
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
