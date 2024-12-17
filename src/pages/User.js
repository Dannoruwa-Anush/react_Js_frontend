import React, { useState } from 'react';
import { Container, Form, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Simulated user data for roles
    const users = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'user1', password: 'user123', role: 'user' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const user = users.find(user => user.username === username && user.password === password);
        
        if (user) {
            // On successful login
            if (user.role === 'admin') {
                navigate('/adminpanel'); // Redirect to Admin Panel
            } else {
                // Add user ID to cart and redirect to cart
                const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
                const updatedCart = cartItems.map(item => ({
                    ...item,
                    userId: username // Assuming username is used as user ID
                }));
                sessionStorage.setItem('cart', JSON.stringify(updatedCart));
                navigate('/cart'); // Redirect to Cart
            }
        } else {
            alert('Invalid username or password'); // Handle invalid credentials
        }
    };

    return (
        <Container className="mt-4">
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {isLogin ? "Login" : "Sign Up"}
                </Button>
                <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </Button>
            </Form>
        </Container>
    );
}

export default User;
