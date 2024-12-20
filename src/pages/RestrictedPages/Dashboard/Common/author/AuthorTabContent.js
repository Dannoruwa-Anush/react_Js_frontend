import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import {
  deleteCategory,
  getAllCategories,
  getCategoryById,
  saveCategory,
  updateCategory,
} from "../../../../../services/CategoryService";

const AuthorTabContent = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update category
      await updateCategory(formData.id, { categoryName: formData.name });
    } else {
      // Save new category
      await saveCategory({ categoryName: formData.name });
    }
    setFormData({ id: "", name: "" });
    setIsEditing(false);
    fetchCategories();
  };

  // Handle edit
  const handleEdit = async (id) => {
    const category = await getCategoryById(id);
    setFormData({ id: category.id, name: category.categoryName });
    setIsEditing(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetchCategories();
  };

  return (
    <div>
      <h1>Category Manager</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {isEditing ? "Update" : "Save"}
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.categoryName}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(category.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AuthorTabContent;


