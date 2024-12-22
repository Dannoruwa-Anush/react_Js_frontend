import { getUserById, updateUser } from "../../../../../services/UserService";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const UserProfileTabContent = () => {
    // Component constants labels
    const SUCCESSFUL_UPDATE_MESSAGE = "Profile Updated successfully!";

    // API responses
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Table & Form
    const [formData, setFormData] = useState({ id: "", username: "", email: "", address: "", telephoneNumber: "" });
    const [isEditing, setIsEditing] = useState(false);

    // useEffect hook
    useEffect(() => {
        fetchUserById();
    }, []); // [] : means that the effect will run only once on the initial render

    // Arrow functions
    const fetchUserById = async () => {
        // get user_id from session storage
        const userId = sessionStorage.getItem("user_id");
        // call API to GetById
        const user = await getUserById(userId);

        // Load data to form
        setFormData({ id: user.id, username: user.username, email: user.email, address: user.address, telephoneNumber: user.telephoneNumber });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission btn click 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateUser(formData.id, { address: formData.address, telephoneNumber: formData.telephoneNumber });
            setSuccessMessage(response.message || SUCCESSFUL_UPDATE_MESSAGE);
            setErrorMessage(""); // Clear any previous errors
            setTimeout(() => {
                setSuccessMessage(""); // Clear the message after 2 seconds
            }, 1000); //1s
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred");
            setSuccessMessage(""); // Clear any previous success message
        }

        setIsEditing(false);

        // To get the latest data from the backend
        fetchUserById();
    };

    return (
        <div>
            <h5 className="mb-4">Profile</h5>

            {/* [Start] : Form */}
            <div className="main-content-form-container">
                <div className="main-content-form-box">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                required
                                value={formData.username}
                                onChange={handleInputChange}
                                readOnly={true}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                readOnly={true}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Telephone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="telephoneNumber"
                                required
                                value={formData.telephoneNumber}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </Form.Group>

                        {errorMessage && (
                            <div className="text-danger mb-3">
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="text-success mb-3">
                                {successMessage}
                            </div>
                        )}

                        <div className="d-flex justify-content-between align-items-center">
                            {/* Edit Icon (Only visible when not editing) */}
                            {!isEditing && (
                                <i
                                    className="bi bi-pencil-square text-primary cursor-pointer"
                                    style={{ fontSize: "20px" }}
                                    onClick={() => setIsEditing(true)} // Enable editing when clicked
                                />
                            )}

                            {/* Save Button (Only visible when editing) */}
                            {isEditing && (
                                <Button variant="primary" type="submit" className="button-style">
                                    Update
                                </Button>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
            {/* [End] : Form */}
        </div>
    );
};

export default UserProfileTabContent;
