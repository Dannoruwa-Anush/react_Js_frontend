import {
    getUserById,
    updateUser,
} from "../../../../../services/UserService";

import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const UserProfileTabContent = () => {
    //Component constants labels

    //API responses
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    //Table & Form
    const [formData, setFormData] = useState({ id: "", username: "", email: "", address: "", telephoneNumber: "" });
    const [isEditing, setIsEditing] = useState(false);

    //useEffect hook
    useEffect(() => {
        fetchUserById();
    }, []); //[] : means that the effect will run only once on the initial render


    //Arrow functions
    const fetchUserById = async () => {
        //get user_id from session storage
        const userId = sessionStorage.getItem("user_id");
        //call API to GetById
        const user = await getUserById(userId);

        //Load data to form
        setFormData({ id: user.id, username: user.username, email: user.email, address: user.address, telephoneNumber: user.telephoneNumber });
    };

    const handleInputChange = (event) => {
        //name, value : attributes of the form controller
        const { name, value } = event.target;

        /*
        update the categoryName property of formData 
        without affecting other properties (like id)
        using spread operator
        */
        setFormData({ ...formData, [name]: value });
    };

    //Handle form submission btn click 
    const handleSubmit = async (event) => {
        /*prevents the form from being submitted to the server
        You can then perform any custom logic, such as sending 
        the data via an API or displaying an error message.
        */
        event.preventDefault();

        //call API to update
        //username & email are not allowed to update
        await updateUser(formData.id, { address: formData.address, telephoneNumber: formData.telephoneNumber });
        
        //Reset formData to empty
        setFormData({ id: "", username: "", email: "", address: "", telephoneNumber: "" });
        setIsEditing(false);

        //To get latest data from backend
        fetchUserById();
    };

    return (
        <div>
            <h5 className="mb-4">Your Details</h5>

            {/* [Start] : Form */}
            <div className="main-content-form-container">
                <h2 className="main-content-form-title">{formData.id ? "Edit" : "New"} Entry</h2>
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
                                readOnly={isEditing}
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
                                readOnly={isEditing}
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
                            />
                        </Form.Group>

                        {errorMessage &&
                            <div className='text-danger mb-3'>
                                {errorMessage}
                            </div>
                        }

                        {successMessage &&
                            <div className='text-success mb-3'>
                                {successMessage}
                            </div>
                        }

                        <div className="text-end">
                            <Button variant="primary" type="submit" className="button-style">
                                {isEditing ? "Update" : "Save"}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            {/* [End]   : Form */}
        </div>
    );
};

export default UserProfileTabContent;