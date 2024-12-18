import { Link, Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";
import BusinessLogo from "../images/companyLogo/BusinessLogo.png";

const Layout = () => {
    const currentYear = new Date().getFullYear();
    //const [cartItems] = useState(3); // Simulated cart items
    const navigate = useNavigate();

    // Simulated data for categories and subcategories
    const categories = [
        { name: "Fiction", subcategories: ["Fantasy", "Mystery", "Romance"] },
        { name: "Non-Fiction", subcategories: ["History", "Biography", "Science"] },
        { name: "Children", subcategories: ["Picture Books", "Early Readers"] },
    ];

    const authors = ["Author 1", "Author 2", "Author 3"];

    // Get username from sessionStorage
    const username = sessionStorage.getItem('username');
    const isLoggedIn = username !== null; // Check if user is logged in

    //Get cart from sessionStorage
    const cartItems = sessionStorage.getItem('cart');
    const numberOfItems = 0;
    if (cartItems) {
        // Parse the cart data to get the array of items
        const currentCart = JSON.parse(cartItems);
    
        // Get the number of objects in the cart
        const numberOfItems = currentCart.length;
    }

    const handleLogout = () => {
        sessionStorage.clear(); // Clear sessionStorage
        navigate("/login"); // Redirect to login page
    };

    return (
        <div id="root">
            {/* Navigation bar section */}
            <Navbar bg="light" expand="lg" className="w-100">
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

                            {/* Category Dropdown */}
                            <NavDropdown
                                title="Category"
                                id="category-dropdown"
                                className="category-dropdown"
                            >
                                {categories.map((category, index) => (
                                    <div key={index} className="category-item">
                                        <NavDropdown.ItemText>
                                            <strong>{category.name}</strong>
                                        </NavDropdown.ItemText>

                                        {/* Subcategories list under the category */}
                                        <div className="subcategory-list">
                                            {category.subcategories.map((sub, subIndex) => (
                                                <NavDropdown.Item
                                                    key={subIndex}
                                                    as={Link}
                                                    to={`/category/${sub.toLowerCase()}`}
                                                >
                                                    {sub}
                                                </NavDropdown.Item>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </NavDropdown>

                            {/* Author Dropdown */}
                            <NavDropdown title="Author" id="author-dropdown">
                                {authors.map((author, index) => (
                                    <NavDropdown.Item key={index} as={Link} to={`/author/${author.toLowerCase()}`}>
                                        {author}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                        </Nav>

                        {/* Shopping Cart */}
                        <Nav className="align-items-center">
                            <Nav.Link as={Link} to="/cart" className="position-relative">
                                <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
                                {numberOfItems > 0 && (
                                    <Badge
                                        bg="danger"
                                        pill
                                        className="position-absolute top-0 start-100 translate-middle"
                                    >
                                        {numberOfItems}
                                    </Badge>
                                )}
                            </Nav.Link>

                            {/* User Icon and Username */}
                            <Nav.Link as={Link} to="/login" className="d-flex flex-column align-items-center">
                                <i className="bi bi-person-circle" style={{ fontSize: "1.5rem" }}></i>
                                {isLoggedIn && (
                                    <div className="user-info mt-1">
                                        <span>{username}</span>
                                        <button onClick={handleLogout} className="btn btn-link p-0">Logout</button>
                                    </div>
                                )}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Page Content */}
            <div className="page-content">
                <Outlet />
            </div>

            {/* Footer */}
            <footer className="footer">
                <Container>
                    <span className="text-muted">
                        Copyright © {currentYear} Dannoruwa-Anush. All Rights Reserved.
                    </span>
                </Container>
            </footer>
        </div>
    );
};

export default Layout;
