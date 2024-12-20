import { Form, Button, Table, Pagination, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCaregories,
  getCaregoryById,
  saveCategory,
  updateCategory,
} from "../../../../../services/CategoryService";

const BUTTON_TEXT = {
  CREATE: "Create",
  EDIT: "Edit",
  DELETE: "Delete",
  CONFIRM_REMOVE: "Confirm Remove",
  CANCEL: "Cancel",
};

const BookTabContent = () => {
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [formData, setFormData] = useState({});
  const [idToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchCategories = async () => {
    try {
      const res = await getAllCaregories();
      setCategoryDetails(res);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.categoryName) {
      alert("Category Name is required");
      return;
    }

    try {
      if (formData.id) {
        const res = await updateCategory(formData.id, formData);
        if (res.success) {
          fetchCategories();
        }
      } else {
        const res = await saveCategory(formData);
        if (res.success) {
          fetchCategories();
        }
      }
      setFormData({});
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Error occurred while saving the category");
    }
  };

  const handleEdit = async (id) => {
    try {
      const category = await getCaregoryById(id);
      setFormData(category); // Populate form with category details
    } catch (error) {
      console.error("Error fetching category details for edit:", error);
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
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setShowModal(false);
      setIdToDelete(null);
    }
  };

  const filteredCategories = categoryDetails.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
                value={formData.categoryName || ""}
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
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
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

export default BookTabContent;
