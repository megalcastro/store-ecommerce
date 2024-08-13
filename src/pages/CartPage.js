// pages/CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { Table, Button } from 'react-bootstrap';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
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
          {cart.length === 0 ? (
            <tr>
              <td colSpan="4">No items in the cart.</td>
            </tr>
          ) : (
            cart.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>
                  <Button variant="danger" onClick={() => handleRemove(item.id)}>Remove</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Button variant="warning" onClick={handleClear}>Clear Cart</Button>
    </div>
  );
};

export default CartPage;
