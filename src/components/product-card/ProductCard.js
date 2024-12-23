import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <Card style={{ width: '18rem' }} className="product-card">
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.description}
            <br />
            <strong>${product.price}</strong>
          </Card.Text>
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>

      {/* Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{product.name} added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ProductCard;
