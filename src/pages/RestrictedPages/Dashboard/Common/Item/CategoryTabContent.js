import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";

const CategoryTabContent = () => {
  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState([
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
  ]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRowClick = (row) => {
    setFormData(row);
  };

  const handleUpdate = () => {
    setTableData((prev) =>
      prev.map((row) => (row.id === formData.id ? formData : row))
    );
    setFormData({});
  };

  return (
    <div>
      <h2 className="mb-4">Tab 1 Content</h2>

      {/* Form Section */}
      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={formData.name || ""}
            onChange={handleFormChange}
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            name="age"
            type="number"
            value={formData.age || ""}
            onChange={handleFormChange}
            placeholder="Enter age"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Form>

      {/* Table Section */}
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleRowClick(row)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryTabContent;
