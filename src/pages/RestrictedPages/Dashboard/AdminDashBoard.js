import React, { useState } from "react";
import TabContent1 from "./../TabContent1";
import TabContent2 from "./../TabContent2";
import { Nav } from "react-bootstrap";

const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: "Tab 1", component: <TabContent1 /> },
    { id: 1, title: "Tab 2", component: <TabContent2 /> },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar for Tabs */}
      <Nav
        className="flex-column border-end"
        style={{ width: "25%", minHeight: "100vh" }}
      >
        {tabs.map((tab, index) => (
          <Nav.Link
            key={tab.id}
            onClick={() => setActiveTab(index)}
            className={activeTab === index ? "active" : ""}
            style={{
              padding: "15px",
              cursor: "pointer",
              backgroundColor: activeTab === index ? "#e9ecef" : "transparent",
            }}
          >
            {tab.title}
          </Nav.Link>
        ))}
      </Nav>

      {/* Render Tab-Specific Component */}
      <div className="p-4" style={{ width: "75%" }}>
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default AdminDashBoard;
