import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_IMAGE_URL } from '../configurations/Config';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false); // State for removal confirmation modal
    const [showLoginModal, setShowLoginModal] = useState(false); // State for login modal
    const [itemToRemove, setItemToRemove] = useState(null); // Track the item to be removed
    const navigate = useNavigate();

    useEffect(() => {
        const items = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCartItems(items);

        // Optionally, calculate total price using backend API if necessary
        if (items) {
            console.log(items);
            const shoppingCartBooks = {
                // Your logic for handling total calculation or backend call
            };
        }

    }, []);

    const handleQuantityChange = (id, newQuantity) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: Number(newQuantity) } : item
        );
        setCartItems(updatedItems);
        sessionStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const handleRemove = (id) => {
        setItemToRemove(id); // Set the item to be removed
        setShowModal(true);   // Show the modal for confirmation
    };

    const confirmRemove = () => {
        const updatedItems = cartItems.filter(item => item.id !== itemToRemove);
        setCartItems(updatedItems);
        sessionStorage.setItem('cart', JSON.stringify(updatedItems));
        setShowModal(false); // Close the modal after removal
    };

    const cancelRemove = () => {
        setShowModal(false); // Close the modal without removing
    };

    const handlePlaceOrder = () => {
        setShowLoginModal(true); // Show the login modal
    };

    const handleLogin = () => {
        navigate('/user'); // Navigate to User page for login/signup
        setShowLoginModal(false); // Close the modal
    };

    const cancelLogin = () => {
        setShowLoginModal(false); // Close the modal without navigating
    };

    return (
        <Container className="mt-4">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <Table bordered striped hover responsive className="book-info-table">
                    <thead>
                        <tr>
                            <th>Item No</th>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <img src={`${API_IMAGE_URL}/${item.image}`} alt={item.title} style={{ width: '100px' }} />
                                </td>
                                <td>
                                    <h5>{item.name}</h5>
                                </td>
                                <td>
                                    <p>Rs. {item.price}</p>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        max={item.qoh}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemove(item.id)}
                                        style={{
                                            borderRadius: '30px',
                                            width: '100px',
                                            height: '40px'
                                        }}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {cartItems.length > 0 && (
                <div className="d-flex justify-content-end">
                    <Button variant="success" onClick={handlePlaceOrder} className="mt-3"
                        style={{
                            borderRadius: '30px',
                        }}>
                        Place Order
                    </Button>
                </div>
            )}

            {/* Confirmation Modal for Item Removal */}
            <Modal show={showModal} onHide={cancelRemove}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove this item from your cart?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelRemove}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmRemove}>
                        Confirm Remove
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Login Modal for Placing Order */}
            <Modal show={showLoginModal} onHide={cancelLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You must be logged in to place an order. Would you like to log in now?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelLogin}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Cart;
