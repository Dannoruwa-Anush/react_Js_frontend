import { Form, Button, Table, Pagination, Modal } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { deleteCategory, getAllCaregories, saveCategory } from "../../../../../services/CategoryService";

// Constants for button texts
const BUTTON_TEXT = {
  CREATE: 'Create',
  EDIT: 'Edit',
  DELETE: 'Delete',
  CONFIRM_REMOVE: 'Confirm Remove',
  CANCEL: 'Cancel',
};

const CategoryTabContent = () => {
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust as needed

  // Load categories from API
  useEffect(() => {
    const categoriesRequest = async () => {
      const res = await getAllCaregories();
      setCategoryDetails(res);
    };
    categoriesRequest();
  }, []);

  // Handle form data input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (Create/Update)
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    if (!formData.categoryName) {
      alert('Category Name is required');
      return;
    }

    // Optimistic Update: Immediately update the category list in UI
    if (!formData.id) {
      const newCategory = { ...formData, id: Date.now() }; // Assign a temporary ID for the new category
      setCategoryDetails((prev) => [newCategory, ...prev]); // Prepend the new category to the list (or append based on design)
    }

    try {
      let res;
      if (formData.id) {
        // Handle update logic if needed
        // Example: await updateCategory(formData);
      } else {
        // Create new category
        res = await saveCategory(formData);
        if (res.success) {
          // Fetch the updated list from API after saving
          const updatedCategories = await getAllCaregories();
          setCategoryDetails(updatedCategories);
        }
      }
    } catch (error) {
      console.error('Error saving category:', error);
      // Optionally revert the optimistic update if there was an error
      setCategoryDetails((prev) => prev.filter((cat) => cat.id !== formData.id));
      alert('There was an error saving the category. Please try again.');
    }

    setFormData({}); // Reset the form after submission
  };

  // Handle row deletion
  const handleDelete = (id) => {
    setIdToDelete(id);
    setShowModal(true);
  };

  const cancelRemove = () => {
    setShowModal(false);
  };

  const confirmRemove = async () => {
    setCategoryDetails((prevDetails) =>
      prevDetails.filter((category) => category.id !== idToDelete)
    );

    try {
      const res = await deleteCategory(idToDelete);
      if (res.success) {
        // Re-fetch after deletion
        const updatedCategories = await getAllCaregories();
        setCategoryDetails(updatedCategories);
      }
    } catch (error) {
      console.error('Error deleting category', error);
      // Handle error gracefully, e.g., by showing a message
    }

    setShowModal(false);
    setIdToDelete(null);
  };

  // Search functionality
  const filteredCategories = categoryDetails.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate categories
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h5 className="mb-4">Book Categories</h5>

      {/* [Start] - Form Section */}
      <div className="main-content-form-container">
        <h2 className="main-content-form-title">New/Update Entry</h2>
        <div className="main-content-form-box">
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                name="categoryName"
                value={formData.categoryName || ''}
                onChange={handleFormChange}
                placeholder="Enter category name"
              />
            </Form.Group>
            <div className="text-end">
              <Button variant="primary" className="button-style" type="submit">
                {formData.id ? BUTTON_TEXT.EDIT : BUTTON_TEXT.CREATE}
              </Button>
            </div>
          </Form>
        </div>
      </div>
      {/* [End] - Form Section */}

      {/* [Start] - Table Section with Search Bar */}
      <div className="main-content-table-container">
        <h2 className="main-content-table-title">Category List</h2>

        {/* [Start] - Search Bar */}
        <div className="main-content-table-search-bar-container mb-3">
          <Form.Control
            type="text"
            placeholder="Search by name"
            className="main-content-table-search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            {currentItems.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.categoryName}</td>
                <td className="main-content-table-action-column">
                  <Button variant="outline-primary" size="sm">
                    {BUTTON_TEXT.EDIT}
                  </Button>{" "}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(row.id)}
                  >
                    {BUTTON_TEXT.DELETE}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* [End] - Table */}

        {/* [Start] - Pagination */}
        <Pagination>
          {Array.from({ length: Math.ceil(filteredCategories.length / itemsPerPage) }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
        {/* [End] - Pagination */}

        {/* [Start] - Modal to confirm removal */}
        <Modal show={showModal} onHide={cancelRemove}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Removal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to remove this?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelRemove}>
              {BUTTON_TEXT.CANCEL}
            </Button>
            <Button variant="danger" onClick={confirmRemove}>
              {BUTTON_TEXT.CONFIRM_REMOVE}
            </Button>
          </Modal.Footer>
        </Modal>
        {/* [End] - Modal */}
      </div>
      {/* [End] - Table Section with Search Bar */}
    </div>
  );
};

export default CategoryTabContent;
