import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import ProductPage from './components/product-page/ProductPage';
import CartPage from './pages/CartPage';
import PaymentModal from './components/payment/PaymentModal';

const App = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  const handleShowPaymentModal = (item) => {
    setCartItem(item);
    setShowPaymentModal(true);
  };
  
  const handleClosePaymentModal = () => setShowPaymentModal(false);

  const handlePayment = (paymentInfo) => {
    console.log('Payment info:', paymentInfo);
    // Aquí puedes manejar el pago, como enviar la información al backend
    // Luego de completar el pago, puedes cerrar el modal y limpiar el carrito si es necesario.
    handleClosePaymentModal();
  };

  return (
    <Provider store={store}>
      <Router>
        <Container>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
          <Button onClick={() => handleShowPaymentModal({})}>Pay with Credit Card</Button>
          <PaymentModal
            show={showPaymentModal}
            handleClose={handleClosePaymentModal}
            handlePayment={handlePayment}
            cartItem={cartItem}
          />
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
