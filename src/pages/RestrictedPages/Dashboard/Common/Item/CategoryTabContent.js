import { Form, Button, Table, Pagination, Modal } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { deleteCategory, getAllCaregories } from "../../../../../services/CategoryService";

// Define a functional component using an arrow function
const CategoryTabContent = () => {

  // Load categories from API
  const [categoryDetails, setCategoryDetails] = useState([]);

  // Modal state and deletion-related state
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    const categoriesRequest = async () => {
      const res = await getAllCaregories();
      setCategoryDetails(res);
    };

    categoriesRequest();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Handle row deletion
  const handleDelete = (id) => {
    setIdToDelete(id); // Set the ID of the row to delete
    setShowModal(true); // Show the modal
  };

  const cancelRemove = () => {
    setShowModal(false); // Close the modal without deleting
  };

  const confirmRemove = async () => {
    // Optimistically remove from UI by filtering out the category
    setCategoryDetails(prevDetails => 
      prevDetails.filter(category => category.id !== idToDelete)
    );

    try {
      // Delete API request 
      const res = await deleteCategory(idToDelete);

      if (res.success) {
        // Re-fetch the categories from the API to ensure we have the latest data
        const updatedCategories = await getAllCaregories();
        setCategoryDetails(updatedCategories);
      } else {
        // If deletion fails, show the deleted category again (or handle the error accordingly)
        const updatedCategories = await getAllCaregories();
        setCategoryDetails(updatedCategories);
      }
    } catch (error) {
      // If an error occurs, show the deleted category again and log the error
      const updatedCategories = await getAllCaregories();
      setCategoryDetails(updatedCategories);
    }

    setShowModal(false); // Close the modal
    setIdToDelete(null); // Clear the ID of the row to delete
  };

  return (
    <div>
      <h5 className="mb-4">Book Categories</h5>

      {/* [Start] - Form Section */}
      <div className="main-content-form-container">
        <h2 className="main-content-form-title">New/Update Entry</h2>
        <div className="main-content-form-box">
          <Form className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                name="categoryName"
                placeholder="Enter category name"
              />
            </Form.Group>
            <div className="text-end">
              <Button variant="primary" className="button-style">
                create
              </Button>
            </div>
          </Form>
        </div>
      </div>
      {/* [End] - Form Section */}

      {/* [Start] - Table Section with Search Bar */}
      <div className="main-content-table-container">
        <h2 className="main-content-table-title">
          Category List
        </h2>

        {/* [Start] - Search Bar */}
        <div className="main-content-table-search-bar-container mb-3">
          <Form.Control
            type="text"
            placeholder="Search by name"
            className="main-content-table-search-bar"
          />
        </div>
        {/* [End]   - Search Bar */}

        {/* [Start] - Table */}
        <Table bordered striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className="main-content-table-action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryDetails && categoryDetails.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.categoryName}</td>
                <td className="main-content-table-action-column">
                  <Button
                    variant="outline-primary"
                    size="sm"
                  >
                    Edit
                  </Button>{" "}

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* [End] - Table */}

        {/*  [Start] - Modal to confirm removal */}
        <Modal show={showModal} onHide={cancelRemove}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Removal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to remove this?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelRemove}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmRemove}>
              Confirm Remove
            </Button>
          </Modal.Footer>
        </Modal>
        {/*  [End] - Modal to confirm removal */}

      </div>
      {/* [End]   - Table Section with Search Bar */}
    </div>
  );
};

export default CategoryTabContent;
