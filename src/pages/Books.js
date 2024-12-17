import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const books = [
    { id: 1, name: "book 1", price: "Rs. 10.00", image: "https://via.placeholder.com/150", quantity: 0 },
    { id: 2, name: "book 2", price: "Rs. 20.00", image: "https://via.placeholder.com/150", quantity: 5 },
    { id: 3, name: "book 3", price: "Rs. 30.00", image: "https://via.placeholder.com/150", quantity: 2 },
    { id: 4, name: "book 4", price: "Rs. 40.00", image: "https://via.placeholder.com/150", quantity: 0 },
    { id: 5, name: "book 5", price: "Rs. 50.00", image: "https://via.placeholder.com/150", quantity: 1 },
];

// Define a functional component using an arrow function
const Books = () => {
    return (
        // JSX (JavaScript XML) used to render the structure of a UI 

        <Container>
            <Row>
                {books.map(book => (
                    <Col sm={6} md={4} lg={3} key={book.id} className="mb-4">
                        <Card style={{ height: '100%' }}>
                            {book.quantity === 0 ? (
                                <>
                                    <Card.Img variant="top" src={book.image} />
                                    <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <Card.Title>{book.name}</Card.Title>
                                        <Card.Text>{book.price}</Card.Text>
                                        <Card.Text style={{ color: 'red' }}>
                                            Out of Stock
                                        </Card.Text>
                                    </Card.Body>
                                </>
                            ) : (
                                <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Card.Img variant="top" src={book.image} />
                                    <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <Card.Title>{book.name}</Card.Title>
                                        <Card.Text>
                                            {book.price}
                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Books;
// Export the component so it can be used elsewhere in the app
