import React, { useState, createContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import BusinessLogo from "../images/companyLogo/BusinessLogo.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { UserRole } from './../constants/ConstantValues';

export const CartContext = createContext();

const Layout = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const [numberOfItems, setNumberOfItems] = useState(0);

    // Get username from sessionStorage
    const username = sessionStorage.getItem('username');
    const isLoggedIn = username !== null; // Check if user is logged in

    // Update number of items whenever the cart is updated
    useEffect(() => {
        const items = JSON.parse(sessionStorage.getItem('cart')) || [];
        setNumberOfItems(items.length);
    }, []);

    const handleLogout = () => {
        sessionStorage.clear(); // Clear sessionStorage
        setNumberOfItems(0);
        navigate("/login"); // Redirect to login page
    };

    const getDashboardPath = () => {
        const roles = sessionStorage.getItem("user_role");

        if (roles.includes(UserRole.ADMIN)) {
            return "/adminDashboard";
        } else if (roles.includes(UserRole.MANAGER)) {
            return "/managerDashboard";
        } else if (roles.includes(UserRole.CUSTOMER)) {
            return "/userDashboard";
        }
        return "/"; // default path if no role matches
    };

    return (
        <div id="root">
            <Navbar bg="light" expand="lg" className="layout-navbar">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        <img src={BusinessLogo} alt="ABC BookShop" className="d-inline-block align-top" height="40" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav>

                        <Nav className="align-items-center">
                            {/* Shopping cart, no item in cart*/}
                            <Nav.Link as={Link} to="/cart" className="position-relative">
                                <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
                                {numberOfItems > 0 && (
                                    <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                                        {numberOfItems}
                                    </Badge>
                                )}
                            </Nav.Link>

                            {/* Dropdown for additional dashboards */}
                            {isLoggedIn && (
                                <Dropdown className="ms-auto">
                                    <DropdownButton
                                        variant="link"
                                        id="user-dropdown"
                                        title={<i className="bi bi-three-dots-vertical" style={{ fontSize: "1.5rem" }}></i>}
                                        className="btn-link p-0"
                                    >
                                        <Dropdown.Item as={Link} to={getDashboardPath()}>Profile</Dropdown.Item>

                                        <Dropdown.Item as="button" onClick={handleLogout}>Logout</Dropdown.Item>
                                    </DropdownButton>
                                </Dropdown>
                            )}

                            {/* User Icon, Username, and Logout */}
                            <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
                                <i className="bi bi-person-circle" style={{ fontSize: "1.5rem" }}></i>

                                {/* Display username at horizontal navbar */}
                                {isLoggedIn ? (
                                    <div className="ms-2 d-flex flex-column align-items-start">
                                        <span>( {username} )</span>
                                    </div>
                                ) : (
                                    <span className="ms-2">Login</span>
                                )}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Page Content */}
            <CartContext.Provider value={{ setNumberOfItems }}>  {/* pass setNumberOfItems to child components*/}
                <div className="page-content">
                    <Outlet />
                </div>
            </CartContext.Provider>

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
