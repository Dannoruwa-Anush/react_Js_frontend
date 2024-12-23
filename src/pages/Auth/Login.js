import { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from "../../services/AuthService"; // Import the userLogin function
import { UserRole } from "./../../constants/ConstantValues";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state for the login process

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form fields
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        const data = {
            username,
            password,
        };

        setLoading(true); // Show loading indicator while the API call is in progress
        setError(""); // Reset any previous error messages

        try {
            // Use userLogin to make the API request
            const loggedUser = await userLogin(data);

            // Reset form and error
            setError("");
            setUsername("");
            setPassword("");

            // Role-based navigation logic
            const roles = loggedUser.roles || [];
            if (roles.includes(UserRole.ADMIN)) {
                navigate("/adminDashboard"); // Redirect to Admin Panel
            } else if (roles.includes(UserRole.MANAGER)) {
                navigate("/managerDashboard"); // Redirect to Manager Panel
            } else if (
                roles.includes(UserRole.CUSTOMER) ||
                roles.includes(UserRole.CASHIER)
            ) {
                // Assuming customer or cashier roles lead to the cart
                const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

                if(cartItems.length === 0){
                    navigate("/userDashBoard"); // Redirect to userDashBoard
                }
                else{
                    const updatedCart = cartItems.map((item) => ({
                        ...item,
                        userId: loggedUser.userId, // Add userId instead of username
                    }));
                    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
                    navigate("/cart"); // Redirect to Cart
                }
            } else {
                setError("Role not recognized, please contact support.");
            }
        } catch (error) {
            setError("Username or Password is wrong");
        } finally {
            setLoading(false); // Hide loading indicator once the process is finished
        }
    };

    return (
        <Container>
            <div className="login-box shadow-sm rounded">
                <div className="text-center mb-4">
                    <h1>Login</h1>
                </div>

                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="username" label="Username" className="mb-3">
                        <Form.Control value={username} onChange={handleUsername} />
                    </FloatingLabel>

                    <FloatingLabel controlId="password" label="Password" className="mb-3">
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </FloatingLabel>

                    <Link to={"/forgot-password"}>{"Forgot Password ?"}</Link>
                    {error && (
                        <div className="text-danger mb-3">
                            {error}
                        </div>
                    )}

                    <div className="text-end">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </div>

                    <Link to={"/register"}>{"Don't have an account? Sign Up"}</Link>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
