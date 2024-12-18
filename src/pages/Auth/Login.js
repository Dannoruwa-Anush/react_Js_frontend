import axios from "axios";
import { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            "username": username,
            "password": password
        }

        try {
            const loggedUser = await axios.post("http://localhost:9090/auth/login", data);
            setError("");
            setUsername("");
            setPassword("");

            sessionStorage.setItem('token', loggedUser.data.token);
            sessionStorage.setItem('username', loggedUser.data.username);
            sessionStorage.setItem('user_id', loggedUser.data.userId);
            sessionStorage.setItem('user_role', JSON.stringify(loggedUser.data.roles)); // Store roles as a JSON string
            axios.defaults.headers.common['Authorization'] = `Bearer ${loggedUser.data.token}`;

            // Role-based navigation logic
            const roles = loggedUser.data.roles;
            if (roles.includes("ADMIN")) {
                navigate('/adminDashboard'); // Redirect to Admin Panel
            } else if (roles.includes("MANAGER")) {
                navigate('/managerDashboard'); // Redirect to Manager Panel
            } else if (roles.includes("CUSTOMER") || roles.includes("CASHIER")) {
                // Assuming customer or cashier roles lead to the cart
                const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
                const updatedCart = cartItems.map(item => ({
                    ...item,
                    userId: loggedUser.data.userId // Add userId instead of username
                }));
                sessionStorage.setItem('cart', JSON.stringify(updatedCart));
                navigate('/cart'); // Redirect to Cart
            } else {
                setError("Role not recognized, please contact support.");
            }
        } catch (error) {
            setError("Username or Password is wrong");
        }
    }

    return (
        <>
            <Container>
                <div className="login-box shadow-sm rounded">
                    <div className='text-center mb-4'>
                        <h1>User Login</h1>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel controlId='username' label="Select a Username" className='mb-3'>
                            <Form.Control placeholder='Select a Username' value={username} onChange={handleUsername} />
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="Select a Password" className='mb-3'>
                            <Form.Control type="password" placeholder='Enter Password' value={password} onChange={handlePassword} />
                        </FloatingLabel>

                        {error &&
                            <div className="text-danger mb-3">
                                {error}
                            </div>
                        }

                        <div className='text-end'>
                            <Button variant="primary" type="submit">Login</Button>
                        </div>

                        <Link to={'/register'}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default Login;
