// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductPage from './components/product-page/ProductPage';
import CartPage from './pages/CartPage';
import PaymentModal from './components/payment/PaymentModal';
import { Container, Button } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';

const App = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleShowPaymentModal = () => setShowPaymentModal(true);
  const handleClosePaymentModal = () => setShowPaymentModal(false);

  const handlePayment = (paymentInfo) => {
    console.log('Payment info:', paymentInfo);
    // Aquí puedes manejar el pago, como enviar la información al backend
  };

  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Button
            variant="primary"
            className="cart-button"
            as={Link}
            to="/cart"
          >
            <BsCart /> Go to Cart
          </Button>
          <PaymentModal
            show={showPaymentModal}
            handleClose={handleClosePaymentModal}
            handlePayment={handlePayment}
          />
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
