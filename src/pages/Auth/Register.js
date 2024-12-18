import { useState } from 'react';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { userRegister } from '../../services/AuthService';

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [telephoneNo, setTelephoneNo] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const [registerEnabled, setRegisterEnabled] = useState(false);

    const handleUsername = (event) => {
        setUsername(event.target.value);

        if (username.length <= 5) {
            setRegisterEnabled(false);
        } else {
            setRegisterEnabled(true);
        }
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);

        if (password.length < 6) {
            setRegisterEnabled(false);
        } else {
            setRegisterEnabled(true);
        }
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
        const regex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (email !== "" && regex.test(email)) {
            setRegisterEnabled(true);
        } else {
            setRegisterEnabled(false);
        }
    }

    const handleAddress = (event) => {
        setAddress(event.target.value);

        if (address.length <= 5) {
            setRegisterEnabled(false);
        } else {
            setRegisterEnabled(true);
        }
    }

    const handleTelephoneNo = (event) => {
        setTelephoneNo(event.target.value);

        if (address.length <= 10 || 13 < address.length) {
            setRegisterEnabled(false);
        } else {
            setRegisterEnabled(true);
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault();

        const registerRequest = {
            'username': username,
            'email': email,
            'password': password,
            'address': address,
            'telephoneNumber': telephoneNo,
        };

        try {
            await userRegister(registerRequest); // Directly call without assigning to `res`
            navigate("/login");
            setError("");
        } catch (error) {
            setError(error.response.registerRequest.message); // Corrected typo here
        }
    }

    return (
        <>
            <Container>
                <div className='login-box shadow-sm rounded'>
                    <div className='text-center mb-4'>
                        <h1>Register</h1>
                    </div>

                    <Form onSubmit={handleRegister}>
                        <FloatingLabel controlId='username' label="Enter your Username" className='mb-3'>
                            <Form.Control value={username} onChange={handleUsername} />
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="Enter your password" className='mb-3'>
                            <Form.Control type="password" value={password} onChange={handlePassword} />
                        </FloatingLabel>

                        <FloatingLabel controlId="email" label="Enter your email address" className='mb-3'>
                            <Form.Control type="email" value={email} onChange={handleEmail} />
                        </FloatingLabel>

                        <FloatingLabel controlId='address' label="Enter your address" className='mb-3'>
                            <Form.Control value={address} onChange={handleAddress} />
                        </FloatingLabel>

                        <FloatingLabel controlId='telephoneNo' label="Enter your telephone no" className='mb-3'>
                            <Form.Control value={telephoneNo} onChange={handleTelephoneNo} />
                        </FloatingLabel>

                        {error &&
                            <div className='text-danger mb-3'>
                                {error}
                            </div>
                        }

                        <div className='text-end'>
                            <Button type="submit" variant="primary" disabled={!registerEnabled}>Register</Button>
                        </div>

                        <Link to={'/login'}>
                            {"Already have an account? Login"}
                        </Link>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default Register;
