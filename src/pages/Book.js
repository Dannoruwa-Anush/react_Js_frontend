import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Form, Modal, Table, Row, Col } from 'react-bootstrap';
import { getBookById } from '../services/BookService';
import { API_IMAGE_URL } from '../configurations/Config';
import { CartContext } from '../layouts/Layout'; // Import CartContext

const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const { setNumberOfItems } = useContext(CartContext); // Access setNumberOfItems from context

    useEffect(() => {
        const bookRequest = async () => {
            const res = await getBookById(id);
            setBook(res);
            if (res) setQuantity(Math.min(res.qoh, 1)); // Set quantity to 1 or max available quantity
        };

        bookRequest();
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Math.min(book.qoh, parseInt(e.target.value) || 1));
        setQuantity(value);
    };

    const handleAddToCart = () => {
        if (book) {
            const currentCart = JSON.parse(sessionStorage.getItem('cart')) || [];
            const existingCartItem = currentCart.find(item => item.id === book.id);

            if (existingCartItem) {
                setShowModal(true); // Show modal if item is already in the cart
                return;
            }

            const cartItem = {
                id: book.id,
                image: book.coverImage,
                name: book.title,
                price: book.unitPrice,
                quantity: quantity,
                qoh: book.qoh,
            };

            currentCart.push(cartItem);
            sessionStorage.setItem('cart', JSON.stringify(currentCart));

            // Update the cart item count in the header using the context
            setNumberOfItems(currentCart.length);

            navigate('/cart');
        }
    };

    const handleCloseModal = () => setShowModal(false); // Close modal

    if (!book) return <div>Loading...</div>;

    return (
        <Container className="mt-4">
            <Row>
                <Col md={6}>
                    <img
                        src={`${API_IMAGE_URL}/${book.coverImage}`}
                        alt={book.title}
                        className="img-fluid w-100"
                    />
                </Col>
                <Col md={6}>
                    <Table bordered striped hover responsive>
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <td>{book.title}</td>
                            </tr>
                            <tr>
                                <th>Author</th>
                                <td>{book.authorName}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>${book.unitPrice}</td>
                            </tr>
                            <tr>
                                <th>Available Quantity</th>
                                <td>{book.qoh}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Form>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max={book.qoh}
                                value={quantity}
                                onChange={handleQuantityChange}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleAddToCart} className="mt-3">
                            Add to Cart
                        </Button>
                    </Form>
                </Col>
            </Row>

            {/* Modal to show if the item is already in the cart */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Item Already in Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This item is already in your cart. Please update the quantity in the cart if you'd like to add more.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Book;
