import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

// Define a functional component using an arrow function
const Book = () => {
    const { id } = useParams(); // Get book ID from URL

    console.log(id);
    
    const navigate = useNavigate(); // Initialize navigate
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Sample book data (you would typically fetch this from an API)
    const books = [
        { id: 1, name: "book 1", price: "Rs. 10.00", image: "https://via.placeholder.com/150", quantity: 0 },
        { id: 2, name: "book 2", price: "Rs. 20.00", image: "https://via.placeholder.com/150", quantity: 5 },
        { id: 3, name: "book 3", price: "Rs. 30.00", image: "https://via.placeholder.com/150", quantity: 2 },
        { id: 4, name: "book 4", price: "Rs. 40.00", image: "https://via.placeholder.com/150", quantity: 0 },
        { id: 5, name: "book 5", price: "Rs. 50.00", image: "https://via.placeholder.com/150", quantity: 1 },
    ];

    useEffect(() => {
        const foundBook = books.find(book => book.id === parseInt(id)); // Ensure id is an integer
        setBook(foundBook);
        if (foundBook) {
            setQuantity(Math.min(1, foundBook.quantity)); // Set initial quantity to 1 or available quantity
        }
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Math.min(book.quantity, parseInt(e.target.value) || 1));
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

        // JSX (JavaScript XML) used to render the structure of a UI
    
        <Container className="mt-4">
            <Row>
                <Col md={6}>
                    <img src={book.image} alt={book.name} className="img-fluid" />
                </Col>
                <Col md={6}>
                    <h2>{book.name}</h2>
                    <p>{book.description}</p>
                    <h4>{book.price}</h4>
                    <Form.Group controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={quantity} 
                            onChange={handleQuantityChange} 
                            min="1" 
                            max={book.quantity} 
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddToCart} disabled={book.quantity === 0}>
                        Add to Cart
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Book; 
// Export the component so it can be used elsewhere in the app
