import axios from "axios";
import { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from "../../services/AuthService"; // Import the userLogin function

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
            // Use userLogin to make the API request
            const loggedUser = await userLogin(data);
            setError("");
            setUsername("");
            setPassword("");

            sessionStorage.setItem('token', loggedUser.token);
            sessionStorage.setItem('username', loggedUser.username);
            sessionStorage.setItem('user_id', loggedUser.userId);
            sessionStorage.setItem('user_role', JSON.stringify(loggedUser.roles)); // Store roles as a JSON string
            axios.defaults.headers.common['Authorization'] = `Bearer ${loggedUser.token}`;

            // Role-based navigation logic
            const roles = loggedUser.roles;
            if (roles.includes("ADMIN")) {
                navigate('/adminDashboard'); // Redirect to Admin Panel
            } else if (roles.includes("MANAGER")) {
                navigate('/managerDashboard'); // Redirect to Manager Panel
            } else if (roles.includes("CUSTOMER") || roles.includes("CASHIER")) {
                // Assuming customer or cashier roles lead to the cart
                const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
                const updatedCart = cartItems.map(item => ({
                    ...item,
                    userId: loggedUser.userId // Add userId instead of username
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
                        <h1>Login</h1>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel controlId='username' label="Username" className='mb-3'>
                            <Form.Control value={username} onChange={handleUsername} />
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="Password" className='mb-3'>
                            <Form.Control type="password" value={password} onChange={handlePassword} />
                        </FloatingLabel>
                        
                        <Link to={'/forgot-password'}>
                            {"Forgot Password ?"}
                        </Link>
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
