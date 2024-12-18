import React, { useState, createContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import BusinessLogo from "../images/companyLogo/BusinessLogo.png";

// Create CartContext to share setNumberOfItems across components
export const CartContext = createContext();

const Layout = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const [numberOfItems, setNumberOfItems] = useState(0);

    // Simulated data for categories and authors
    const categories = [
        { name: "Fiction", subcategories: ["Fantasy", "Mystery", "Romance"] },
        { name: "Non-Fiction", subcategories: ["History", "Biography", "Science"] },
        { name: "Children", subcategories: ["Picture Books", "Early Readers"] },
    ];
    const authors = ["Author 1", "Author 2", "Author 3"];

    // Retrieve username from sessionStorage
    const username = sessionStorage.getItem("username");
    const isLoggedIn = username !== null;

    // Get cart items from sessionStorage on initial load
    useEffect(() => {
        const cartItems = sessionStorage.getItem("cart");
        if (cartItems) {
            const currentCart = JSON.parse(cartItems);
            setNumberOfItems(currentCart.length);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear(); // Clear session storage
        navigate("/login"); // Redirect to login page
    };

    return (
        <div id="root">
            {/* Navbar */}
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src={BusinessLogo}
                            alt="ABC BookShop"
                            className="d-inline-block align-top"
                            height="40"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <NavDropdown title="Category" id="category-dropdown">
                                {categories.map((category, index) => (
                                    <NavDropdown.Item key={index} as={Link} to={`/category/${category.name}`}>
                                        {category.name}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <NavDropdown title="Author" id="author-dropdown">
                                {authors.map((author, index) => (
                                    <NavDropdown.Item key={index} as={Link} to={`/author/${author}`}>
                                        {author}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                        </Nav>
                        <Nav className="align-items-center">
                            <Nav.Link as={Link} to="/cart" className="position-relative">
                                <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
                                {numberOfItems > 0 && (
                                    <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                                        {numberOfItems}
                                    </Badge>
                                )}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">
                                {isLoggedIn ? (
                                    <>
                                        <span>{username}</span>
                                        <button onClick={handleLogout} className="btn btn-link p-0">Logout</button>
                                    </>
                                ) : (
                                    <span>Login</span>
                                )}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Page Content */}
            <CartContext.Provider value={{ setNumberOfItems }}>
                <div className="page-content">
                    <Outlet />
                </div>
            </CartContext.Provider>

            {/* Footer */}
            <footer className="footer">
                <Container>
                    <span className="text-muted">© {currentYear} Dannoruwa-Anush. All Rights Reserved.</span>
                </Container>
            </footer>
        </div>
    );
};

export default Layout;
