import { Form, Button, Table, Pagination, Modal } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { deleteCategory, getAllCaregories, getCaregoryById, saveCategory, updateCategory } from "../../../../../services/CategoryService";

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
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const categoriesRequest = async () => {
      const res = await getAllCaregories();
      setCategoryDetails(res);
    };
    categoriesRequest();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.categoryName) {
      alert('Category Name is required');
      return;
    }

    try {
      let res;
      if (formData.id) {
        // Update existing category
        res = await updateCategory(formData.id, formData);
        if (res.success) {
          // Optimistically update local state
          setCategoryDetails((prevDetails) =>
            prevDetails.map((category) =>
              category.id === formData.id ? { ...category, categoryName: formData.categoryName } : category
            )
          );
        }
      } else {
        // Create new category
        res = await saveCategory(formData);
        if (res.success) {
          // Optimistically add new category to state
          setCategoryDetails((prevDetails) => [
            ...prevDetails,
            { ...formData, id: res.data.id }, // Assuming the new category has an id in the response
          ]);
        }
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error occurred while saving the category');
    }

    setFormData({}); // Reset form after submission
  };

  const handleEdit = async (id) => {
    try {
      const category = await getCaregoryById(id);
      setFormData(category); // Set the form data to the category being edited
    } catch (error) {
      console.error('Error fetching category details for edit:', error);
      alert('Failed to load category details');
    }
  };

  const handleDelete = (id) => {
    setIdToDelete(id);
    setShowModal(true);
  };

  const cancelRemove = () => setShowModal(false);

  const confirmRemove = async () => {
    try {
      const res = await deleteCategory(idToDelete);
      if (res.success) {
        // Optimistically remove category from state
        setCategoryDetails((prevDetails) =>
          prevDetails.filter((category) => category.id !== idToDelete)
        );
      }
    } catch (error) {
      console.error('Error deleting category', error);
      alert('Error occurred while deleting the category');
    }

    setShowModal(false);
    setIdToDelete(null);
  };

  const filteredCategories = categoryDetails.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h5 className="mb-4">Book Categories</h5>
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

      <div className="main-content-table-container">
        <h2 className="main-content-table-title">Category List</h2>
        <div className="main-content-table-search-bar-container mb-3">
          <Form.Control
            type="text"
            placeholder="Search by name"
            className="main-content-table-search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
                  <Button variant="outline-primary" size="sm" onClick={() => handleEdit(row.id)}>
                    {BUTTON_TEXT.EDIT}
                  </Button>{" "}
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row.id)}>
                    {BUTTON_TEXT.DELETE}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {Array.from({ length: Math.ceil(filteredCategories.length / itemsPerPage) }, (_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>

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
      </div>
    </div>
  );
};

export default CategoryTabContent;
