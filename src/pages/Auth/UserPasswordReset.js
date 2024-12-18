import { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { passwordReset, userAccountRecovery } from "../../services/AuthService";

const UserPasswordReset = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // Step to track the current form state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);

    // Handle the username input
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    // Handle the email input
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    // Handle the new password input
    const handleNewPassword = (event) => {
        setNewPassword(event.target.value);
    }

    // Handle the confirm password input
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    // Submit the username to fetch user details
    const handleUsernameSubmit = async (event) => {
        event.preventDefault();

        try {
            const userAccountRecoveryRequest = {
                "username": username,
            }

            const response = await userAccountRecovery(userAccountRecoveryRequest);

            if (response) {
                setUser(response); // Store user details to confirm identity
                setStep(2); // Proceed to the next step (email form)
                setError("");
            } else {
                setError("User not found.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    }

    // Submit the email to verify user and move to password reset step
    const handleEmailSubmit = (event) => {
        event.preventDefault();
        if (user.email !== email) {
            setError("Email does not match our records.");
            return;
        }
        setStep(3); // Proceed to password reset form
        setError("");
    }

    // Submit the new password to reset
    const handlePasswordSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const passwordResetRequest= {
                id: user.id,
                newPassword: newPassword
            };
            
            await passwordReset(passwordResetRequest);
            setError("");
            navigate("/login"); // Redirect to login after password reset
        } catch (error) {
            setError("Failed to reset password. Please try again.");
        }
    }

    return (
        <Container>
            <div className="login-box shadow-sm rounded">
                {step === 1 && (
                    <Form onSubmit={handleUsernameSubmit}>
                        <div className="text-center mb-4">
                            <h1>Forgot Your Password?</h1>
                        </div>
                        <FloatingLabel controlId="username" label="Username" className="mb-3">
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={handleUsername}
                            />
                        </FloatingLabel>

                        {error && <div className="text-danger mb-3">{error}</div>}

                        <div className="text-end">
                            <Button variant="primary" type="submit">Next</Button>
                        </div>
                    </Form>
                )}

                {step === 2 && user && (
                    <Form onSubmit={handleEmailSubmit}>
                        <div className="text-center mb-4">
                            <h1>Verify Email</h1>
                        </div>
                        <FloatingLabel controlId="email" label="Email" className="mb-3">
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={handleEmail}
                            />
                        </FloatingLabel>

                        {error && <div className="text-danger mb-3">{error}</div>}

                        <div className="text-end">
                            <Button variant="primary" type="submit">Verify</Button>
                        </div>
                    </Form>
                )}

                {step === 3 && (
                    <Form onSubmit={handlePasswordSubmit}>
                        <div className="text-center mb-4">
                            <h1>Reset Your Password</h1>
                        </div>
                        <FloatingLabel controlId="newPassword" label="New Password" className="mb-3">
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={handleNewPassword}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mb-3">
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPassword}
                            />
                        </FloatingLabel>

                        {error && <div className="text-danger mb-3">{error}</div>}

                        <div className="text-end">
                            <Button variant="primary" type="submit">Reset Password</Button>
                        </div>
                    </Form>
                )}
            </div>
        </Container>
    );
}

export default UserPasswordReset;
