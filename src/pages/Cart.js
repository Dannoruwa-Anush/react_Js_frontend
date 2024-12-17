import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const items = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCartItems(items);
    }, []);

    const handleQuantityChange = (id, newQuantity) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: Number(newQuantity) } : item
        );
        setCartItems(updatedItems);
        sessionStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const handleRemove = (id) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
        sessionStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const handlePlaceOrder = () => {
        navigate('/user'); // Navigate to User page for login/signup
    };

    return (
        <Container className="mt-4">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Details</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <img src={item.image} alt={item.name} style={{ width: '100px' }} />
                                </td>
                                <td>
                                    <h5>{item.name}</h5>
                                    <p>{item.price}</p>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemove(item.id)}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {cartItems.length > 0 && (
                <Button variant="success" onClick={handlePlaceOrder} className="mt-3">
                    Place Order
                </Button>
            )}
        </Container>
    );
}

export default Cart;
