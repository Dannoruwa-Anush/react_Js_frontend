import React from "react";
import { Form, Button, Table } from "react-bootstrap";

const ReusableFormWithTable = ({
  formData,
  setFormData,
  onSubmit,
  editingId,
  tableData,
  onEdit,
  onDelete,
}) => {
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {/* Form Section */}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        {/* Add more fields as needed */}
        <Button variant="primary" type="submit">
          {editingId ? "Update" : "Submit"}
        </Button>
      </Form>

      <hr />

      {/* Table Section */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onEdit(row.id)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(row.id)}
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

export default ReusableFormWithTable;
