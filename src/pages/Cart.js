import React, { useEffect, useState, useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_IMAGE_URL } from '../configurations/Config';
import { getShoppingCartTotal } from '../services/ShoppingCartService';
import { CartContext } from './../layouts/Layout';
import { UserRole } from './../constants/ConstantValues';
import ReusableModalConfirmationMessage from './../layouts/customReusableComponents/modalMessages/ReusableModalConfirmationMessage';
import ReusableModalNotificationMessage from './../layouts/customReusableComponents/modalMessages/ReusableModalNotificationMessage';


const Cart = () => {
    //shopping cart
    const { setNumberOfItems } = useContext(CartContext); // Access setNumberOfItems from CartContext
    const [itemToRemove, setItemToRemove] = useState(null);
    const [cartTotalAmount, setCartTotalAmount] = useState(0.0);

    //API response
    const [cartItems, setCartItems] = useState([]);
    
    //Modals
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showUnauthorizedAccessNotificationModal, setShowUnauthorizedAccessNotificationModal] = useState(false);
    
    //page naviagtion
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
        const token = sessionStorage.getItem("token");

        if (!token) {
            // If token is empty, show the login modal
            setShowLoginModal(true);
            return;
        }

        const roles = sessionStorage.getItem("user_role");

        if (!roles) {
            // If roles are not available, log or handle the error gracefully
            console.error("User roles are not defined.");
            return;
        }

        // Check if the user has either the CUSTOMER or CASHIER role
        if (roles.includes(UserRole.CUSTOMER) || roles.includes(UserRole.CASHIER)) {
            //To place an order, the role must be either CUSTOMER or CASHIER.
            navigate('/orderConfirmation');
        } else {
            //show error message in modal
            setShowUnauthorizedAccessNotificationModal(true);
        }
    };

    const handleLogin = () => {
        navigate('/login');
        setShowLoginModal(false);
    };

    const cancelLogin = () => {
        setShowLoginModal(false);
    };

    const cancelUnauthorizedAccessNotification = () => {
        setShowUnauthorizedAccessNotificationModal(false);
    };

    return (
        <Container className="mt-4">
            <h5>Shopping Cart</h5>
            <div className="main-content-table-container">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (

                    <Table bordered striped hover responsive>
                        <thead>
                            <tr>
                                <th>Item No</th>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th className="main-content-table-action-column">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                        <img src={`${API_IMAGE_URL}/${item.image}`} alt={item.title} style={{ width: '100px' }} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>Rs. {item.price}</td>
                                    <td className="cart-table-qty-column">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            max={item.qoh}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            className='cart-table-qty-input-field'
                                        />
                                    </td>
                                    <td className="main-content-table-action-column">
                                        <Button variant="outline-danger" size="sm" onClick={() => handleRemove(item.id)}
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
                        <Button variant="primary" onClick={handlePlaceOrder} className="button-style">
                            Place Order
                        </Button>
                    </div>
                )}

                {/* [Start] : Reusable Modal (Custom component) : Item Removal confirmation */}
                <ReusableModalConfirmationMessage
                    show={showModal}
                    modalHeader="Confirm Removal"
                    modalBody="Are you sure you want to remove this item from your cart?"
                    onCancel={cancelRemove}
                    onConfirm={confirmRemove}
                />
                {/* [End]   : Reusable Modal (Custom component) : Item Removal confirmation */}


                {/* [Start]   : Reusable Modal (Custom component) : Login confirmation */}
                <ReusableModalConfirmationMessage
                    show={showLoginModal}
                    modalHeader="Confirm Login"
                    modalBody=" You must be logged in to place an order. Would you like to log in now?"
                    onCancel={cancelLogin}
                    onConfirm={handleLogin}
                />
                {/* [End]     : Reusable Modal (Custom component) : Login confirmation */}

                {/* [Start] : Reusable Modal (Custom component) : Unauthorized Access Notification */}
                <ReusableModalNotificationMessage
                    show={showUnauthorizedAccessNotificationModal}
                    modalHeader="Error"
                    modalBody="You do not have permission to place an order."
                    onConfirm={cancelUnauthorizedAccessNotification}
                />
                {/* [End]   : Reusable Modal (Custom component) : Unauthorized Access Notification */}
            </div>
        </Container>
    );
};

export default Cart;
