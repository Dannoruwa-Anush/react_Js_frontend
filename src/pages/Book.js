import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Table, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { getBookById } from '../services/BookService';
import { API_IMAGE_URL } from '../configurations/Config';

const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        const bookRequest = async () => {
            const res = await getBookById(id);
            setBook(res);

            if (res) {
                setQuantity(Math.min(1, res.qoh));
            }
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
                setShowModal(true); // Show the modal if the book is already in the cart
                return; // Prevent adding the book if it already exists
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

            navigate('/cart'); // Navigate to the cart page
        }
    };

    const handleCloseModal = () => setShowModal(false); // Close the modal

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
                    <Table bordered striped hover responsive className="book-info-table">
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
                                <th>Category</th>
                                <td>{book.categoryName}</td>
                            </tr>
                            <tr>
                                <th>SubCategory</th>
                                <td>{book.subCategoryName}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>Rs. {book.unitPrice}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Form.Group controlId="quantity" className="d-flex align-items-center">
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            max={book.qoh}
                            className="me-2"
                            style={{ width: '50%' }}
                        />
                        <Button
                            variant="primary"
                            onClick={handleAddToCart}
                            disabled={book.qoh === 0}
                            style={{
                                width: '50%',
                                borderRadius: '30px'
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Form.Group>
                </Col>
            </Row>

            {/* Modal for displaying message */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Item Already in Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This book is already in your cart! You can increase the quantity or proceed to the cart.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => navigate('/cart')}>
                        Go to Cart
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Book;
