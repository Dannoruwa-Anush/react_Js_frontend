import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllBooks, getAllBooksByAuthorId, getAllBooksByCategoryId } from '../services/BookService';
import { API_IMAGE_URL } from '../configurations/Config';
import { getAllAuthors } from '../services/Author';
import { getAllCategoryWithSubCategory } from '../services/Category';

const Books = () => {
   
    const [bookDetails, setBookDetails] = useState([]);
    const [authorDetails, setAuthorDetails] = useState([]);
    const [categorySubCategoryDetails, setCategorySubCategoryDetails] = useState([]);
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

        const categoryWithSubCategoriesRequest = async () => {
            const res = await getAllCategoryWithSubCategory();
            setCategorySubCategoryDetails(res);
        };

        booksRequest();
        authorsRequest();
        categoryWithSubCategoriesRequest();

    }, []);


    const handleSelectCategory = async (categoryId) => {
        try {
            const res = await getAllBooksByCategoryId(categoryId);
            setBookDetails(res);
        } catch (error) {
            console.error("Error fetching books: ", error);
        }
    };

    const handleSelectAuthor = async (authorId) => {
        try {
            const res = await getAllBooksByAuthorId(authorId);
            setBookDetails(res);
        } catch (error) {
            console.error("Error fetching books: ", error);
        }
    };

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
                                <Dropdown.Menu show={expandedDropdown === 'categorySubCategoryDetails'}>
                                    {categorySubCategoryDetails && categorySubCategoryDetails.map((category, index) => (
                                        <Dropdown
                                            key={index}
                                            onMouseEnter={() => setExpandedSubDropdown(category.categoryName)}
                                            onMouseLeave={() => setExpandedSubDropdown(null)}
                                            className="category-item mb-2"
                                        >
                                            <Dropdown.Toggle
                                                variant="light"
                                                id={`subcategory-dropdown-${index}`}
                                                className="w-100 text-start ps-3"
                                            >
                                                <span
                                                    key={index}
                                                    onClick={(e) => {
                                                        e.preventDefault();  // Prevent default behavior
                                                        handleSelectCategory(category.id);
                                                    }}
                                                >
                                                    {category.categoryName}
                                                </span>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu show={expandedSubDropdown === category.categoryName}>
                                                {category.subCategoriesNames && category.subCategoriesNames.map((sub, subIndex) => (
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
                                        {authorDetails && authorDetails.map((author, index) => (
                                            <Dropdown.Item as="button" key={index} onClick={(e) => {
                                                e.preventDefault();  // Prevent default behavior
                                                handleSelectAuthor(author.id);
                                            }}>
                                                {author.authorName.toLowerCase()}
                                            </Dropdown.Item>
                                        ))}
                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar>
                </Col>

                {/* Right column for book details */}
                <Col md={9}>
                    {bookDetails.length === 0 ? (
                        <p>No books are available</p>
                    ) : (
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
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Books;
