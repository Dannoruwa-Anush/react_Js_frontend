import React, { useEffect, useState, useContext } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_IMAGE_URL } from '../configurations/Config';
import { getShoppingCartTotal } from '../services/ShoppingCartService';
import { CartContext } from './../layouts/Layout'; // Import CartContext

const Cart = () => {
    const { setNumberOfItems } = useContext(CartContext); // Access setNumberOfItems from CartContext
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [cartTotalAmount, setCartTotalAmount] = useState(0.0);
    const navigate = useNavigate();

    useEffect(() => {
        const items = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCartItems(items);

        // Calculate total price using backend API
        if (items && items.length > 0) {
            const shoppingCartBooks = {
                shoppingCartBooks: items.map(item => ({
                    bookId: item.id,
                    quantity: item.quantity
                }))
            };

            const getTotalRequest = async () => {
                const res = await getShoppingCartTotal(shoppingCartBooks);

                // Ensure the response is either a number or an object with a totalAmount key
                if (typeof res === 'object' && res.totalAmount !== undefined) {
                    setCartTotalAmount(res.totalAmount);  // Extract totalAmount from the object
                } else if (typeof res === 'number') {
                    setCartTotalAmount(res);  // If res is a number, use it directly
                } else {
                    console.error("Unexpected response from API", res);
                    setCartTotalAmount(0);  // Fallback to 0 if response is unexpected
                }
            };

            getTotalRequest();
        }
    }, []);

    const handleQuantityChange = (id, newQuantity) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: Number(newQuantity) } : item
        );
        setCartItems(updatedItems);
        sessionStorage.setItem('cart', JSON.stringify(updatedItems));

        // Recalculate total after quantity change
        const shoppingCartBooks = {
            shoppingCartBooks: updatedItems.map(item => ({
                bookId: item.id,
                quantity: item.quantity
            }))
        };

        const getTotalRequest = async () => {
            const res = await getShoppingCartTotal(shoppingCartBooks);

            if (typeof res === 'object' && res.totalAmount !== undefined) {
                setCartTotalAmount(res.totalAmount);
            } else if (typeof res === 'number') {
                setCartTotalAmount(res);
            } else {
                console.error("Unexpected response from API", res);
                setCartTotalAmount(0);
            }
        };

        getTotalRequest();
    };

    const handleRemove = (id) => {
        setItemToRemove(id);
        setShowModal(true);
    };

    const confirmRemove = () => {
        const updatedItems = cartItems.filter(item => item.id !== itemToRemove);
        setCartItems(updatedItems);
        sessionStorage.setItem('cart', JSON.stringify(updatedItems));
        setShowModal(false);

        // Update the global number of items
        setNumberOfItems(updatedItems.length);

        // Recalculate total after item removal
        const shoppingCartBooks = {
            shoppingCartBooks: updatedItems.map(item => ({
                bookId: item.id,
                quantity: item.quantity
            }))
        };

        const getTotalRequest = async () => {
            const res = await getShoppingCartTotal(shoppingCartBooks);

            if (typeof res === 'object' && res.totalAmount !== undefined) {
                setCartTotalAmount(res.totalAmount);
            } else if (typeof res === 'number') {
                setCartTotalAmount(res);
            } else {
                console.error("Unexpected response from API", res);
                setCartTotalAmount(0);
            }
        };

        getTotalRequest();
    };

    const cancelRemove = () => {
        setShowModal(false);
    };

    const handlePlaceOrder = () => {
        setShowLoginModal(true);
    };

    const handleLogin = () => {
        navigate('/login');
        setShowLoginModal(false);
    };

    const cancelLogin = () => {
        setShowLoginModal(false);
    };

    return (
        <Container className="mt-4">
            <h5>Shopping Cart</h5>
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
                <div className='div-cart-total-amount'>
                    <span>Total: Rs. {cartTotalAmount}</span>
                </div>
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
