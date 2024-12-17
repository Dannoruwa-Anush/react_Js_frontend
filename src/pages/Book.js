import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { getBookById } from '../services/BookService';
import { API_IMAGE_URL } from '../configurations/Config';

// Define a functional component using an arrow function
const Book = () => {
    const { id } = useParams(); // Get book ID from URL
    const navigate = useNavigate(); // Initialize navigate
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        const bookRequest = async () => {
            const res = await getBookById(id);
            setBook(res);

            if (res) {
                setQuantity(Math.min(1, res.qoh)); // Set initial quantity to 1 or available quantity
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
            const cartItem = {
                id: book.id,
                name: book.name,
                price: book.price,
                quantity: quantity,
            };

            // Store the cart item in session storage
            const currentCart = JSON.parse(sessionStorage.getItem('cart')) || [];
            currentCart.push(cartItem);
            sessionStorage.setItem('cart', JSON.stringify(currentCart));

            console.log(`Added ${quantity} of ${book.name} to cart`);

            // Navigate to the cart page
            navigate('/cart'); // Navigate to the cart page
        }
    };

    if (!book) return <div>Loading...</div>; // Handle loading state

    return (
        <Container className="mt-4">
            <Row>
                <Col md={6}>
                    <img 
                        src={`${API_IMAGE_URL}/${book.coverImage}`} 
                        alt={book.title} 
                        className="img-fluid w-100" // Ensure the image spans the full width of the column
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
                            style={{ width: '50%' }} // Set the width to 50% for the input field
                        />
                        <Button
                            variant="primary"
                            onClick={handleAddToCart}
                            disabled={book.qoh === 0}
                            style={{
                                width: '50%',          // Set the width to 50% for the button
                                borderRadius: '30px'   // Make the button oval-shaped
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
}

export default Book;
