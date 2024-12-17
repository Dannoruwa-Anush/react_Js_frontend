//The common layout for the entire project is defined here.

import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";
import BusinessLogo from "../images/companyLogo/BusinessLogo.png";

const Layout = () => {
    const currentYear = new Date().getFullYear();
    const [cartItems] = useState(3); // Simulated cart items

    // Simulated data for categories and subcategories
    const categories = [
        { name: "Fiction", subcategories: ["Fantasy", "Mystery", "Romance"] },
        { name: "Non-Fiction", subcategories: ["History", "Biography", "Science"] },
        { name: "Children", subcategories: ["Picture Books", "Early Readers"] },
    ];

    const authors = ["Author 1", "Author 2", "Author 3"];

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
                                {cartItems > 0 && (
                                    <Badge
                                        bg="danger"
                                        pill
                                        className="position-absolute top-0 start-100 translate-middle"
                                    >
                                        {cartItems}
                                    </Badge>
                                )}
                            </Nav.Link>

                            {/* User Icon */}
                            <Nav.Link as={Link} to="/user">
                                <i className="bi bi-person-circle" style={{ fontSize: "1.5rem" }}></i>
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
