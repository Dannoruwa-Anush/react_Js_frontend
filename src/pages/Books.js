import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllBooks } from '../services/BookService';
import { API_IMAGE_URL } from '../configurations/Config';
import { getAllAuthors } from '../services/Author';

const Books = () => {
    const categories = [
        { name: "Fiction", subcategories: ["Fantasy", "Mystery", "Romance"] },
        { name: "Non-Fiction", subcategories: ["History", "Biography", "Science"] },
        { name: "Children", subcategories: ["Picture Books", "Early Readers"] },
    ];

    const [bookDetails, setBookDetails] = useState([]);
    const [authorDetails, setAuthorDetails] = useState([]);
    const [expandedDropdown, setExpandedDropdown] = useState(null); // Tracks the expanded dropdown
    const [expandedSubDropdown, setExpandedSubDropdown] = useState(null); // Tracks expanded subcategories

    useEffect(() => {
        const booksRequest = async () => {
            const res = await getAllBooks();
            setBookDetails(res);
        };

        const authorsRequest = async () => {
            const res = await getAllAuthors();
            setAuthorDetails(res);
        };

        booksRequest();
        authorsRequest();
    }, []);

    return (
        <Container fluid>
            <Row>
                {/* Left column for vertical navbar */}
                <Col md={3} className="vertical-navbar">
                    <Navbar bg="light" expand="md" className="flex-column">
                        <Nav className="flex-column">

                            {/* Categories Dropdown */}
                            <Dropdown
                                onMouseEnter={() => setExpandedDropdown('categories')}
                                onMouseLeave={() => setExpandedDropdown(null)}
                                className="mb-3"
                            >
                                <Dropdown.Toggle variant="light" id="categories-dropdown" className="w-100 text-start">
                                    Categories
                                </Dropdown.Toggle>
                                <Dropdown.Menu show={expandedDropdown === 'categories'}>
                                    {categories.map((category, index) => (
                                        <Dropdown
                                            key={index}
                                            onMouseEnter={() => setExpandedSubDropdown(category.name)}
                                            onMouseLeave={() => setExpandedSubDropdown(null)}
                                            className="category-item mb-2"
                                        >
                                            <Dropdown.Toggle
                                                variant="light"
                                                id={`subcategory-dropdown-${index}`}
                                                className="w-100 text-start ps-3"
                                            >
                                                {category.name}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu show={expandedSubDropdown === category.name}>
                                                {category.subcategories.map((sub, subIndex) => (
                                                    <Dropdown.Item
                                                        key={subIndex}
                                                        as={Link}
                                                        to={`/category/${sub.toLowerCase()}`}
                                                        className="ps-4"
                                                    >
                                                        {sub}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* Authors Dropdown */}
                            <Dropdown
                                onMouseEnter={() => setExpandedDropdown('authors')}
                                onMouseLeave={() => setExpandedDropdown(null)}
                                className="mb-3"
                            >
                                <Dropdown.Toggle variant="light" id="authors-dropdown" className="w-100 text-start">
                                    Authors
                                </Dropdown.Toggle>
                                <Dropdown.Menu show={expandedDropdown === 'authorDetails'}>
                                    <ul className="list-unstyled ps-3">
                                        {authorDetails.map((author, index) => (
                                            <li key={index}>
                                                <Link to={`/author/${author.authorName.toLowerCase()}`} className="text-decoration-none">
                                                    {author.authorName}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar>
                </Col>

                {/* Right column for book details */}
                <Col md={9}>
                    <Row>
                        {bookDetails && bookDetails.map((book) => (
                            <Col sm={6} md={4} lg={3} key={book.id} className="mb-4">
                                <Card style={{ height: '100%' }}>
                                    {book.qoh === 0 ? (
                                        <>
                                            <Card.Img
                                                className="card-books-image"
                                                variant="top"
                                                src={`${API_IMAGE_URL}/${book.coverImage}`}
                                                height={200}
                                                width={300}
                                            />
                                            <Card.Body className="books-image-card-body">
                                                <Card.Title className="books-title">{book.title}</Card.Title>
                                                <Card.Text className="books-price">Rs. {book.unitPrice}</Card.Text>
                                                <Card.Text style={{ color: 'red', textAlign: 'center' }}>
                                                    Out of Stock
                                                </Card.Text>
                                            </Card.Body>
                                        </>
                                    ) : (
                                        <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Card.Img
                                                className="card-books-image"
                                                variant="top"
                                                src={`${API_IMAGE_URL}/${book.coverImage}`}
                                                height={200}
                                                width={300}
                                            />
                                            <Card.Body className="books-image-card-body">
                                                <Card.Title className="books-title">{book.title}</Card.Title>
                                                <Card.Text className="books-price">Rs. {book.unitPrice}</Card.Text>
                                            </Card.Body>
                                        </Link>
                                    )}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Books;
