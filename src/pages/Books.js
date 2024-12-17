import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllBooks } from '../services/BookService';
import { API_IMAGE_URL } from '../configurations/Config';

// Define a functional component using an arrow function
const Books = () => {

    const [bookDetails, setBookDetails] = useState(null);

    useEffect(()=>{
        const booksRequest = async()=>{
            const res = await getAllBooks();
            setBookDetails(res);
        }
        booksRequest();
    }, []);

    return (
        // JSX (JavaScript XML) used to render the structure of a UI 

        <Container>
            <Row>
                {bookDetails && bookDetails.map(book => (
                    <Col sm={6} md={4} lg={3} key={book.id} className="mb-4">
                        <Card style={{ height: '100%' }}>
                            {book.qoh === 0 ? (
                                <>
                                    <Card.Img className="card-books-image"  variant="top" src={`${API_IMAGE_URL}/${book.coverImage}`} height={300} width={300}/>
                                    <Card.Body className="books-image-card-body">
                                        <Card.Title className="books-title">{book.title}</Card.Title>
                                        <Card.Text className="books-price">Rs. {book.unitPrice}</Card.Text>
                                        <Card.Text style={{ color: 'red', textAlign:'center' }}>
                                            Out of Stock
                                        </Card.Text>
                                    </Card.Body>
                                </>
                            ) : (
                                <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Card.Img className="card-books-image" variant="top" src={`${API_IMAGE_URL}/${book.coverImage}`} height={300} width={300}/>
                                    <Card.Body className="books-image-card-body">
                                        <Card.Title className="books-title">{book.title}</Card.Title>
                                        <Card.Text className="books-price">Rs. {book.unitPrice}
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
