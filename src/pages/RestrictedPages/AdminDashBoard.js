import React, { useState, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
import ReusableFormWithTable from "./ReusableFormWithTable";

const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch table data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("/api/data");
    const data = await response.json();
    setTableData(data);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (editingId) {
      // Update API call
      await fetch(`/api/data/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      // Create API call
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }

    setFormData({});
    setEditingId(null);
    fetchData();
  };

  const handleEdit = (id) => {
    const row = tableData.find((item) => item.id === id);
    setFormData(row);
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/data/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="d-flex">
      <Nav variant="pills" className="flex-column" style={{ width: "25%" }}>
        <Nav.Item>
          <Nav.Link
            eventKey="tab1"
            onClick={() => setActiveTab("tab1")}
            active={activeTab === "tab1"}
          >
            Tab 1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="tab2"
            onClick={() => setActiveTab("tab2")}
            active={activeTab === "tab2"}
          >
            Tab 2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content style={{ width: "75%", padding: "1rem" }}>
        <Tab.Pane eventKey="tab1" active={activeTab === "tab1"}>
          <h3>Form and Table for Tab 1</h3>
          <ReusableFormWithTable
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            editingId={editingId}
            tableData={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Tab.Pane>

        <Tab.Pane eventKey="tab2" active={activeTab === "tab2"}>
          <h3>Form and Table for Tab 2</h3>
          <ReusableFormWithTable
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            editingId={editingId}
            tableData={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Tab.Pane>
      </Tab.Content>
    </div>
  );
};

export default AdminDashBoard;
