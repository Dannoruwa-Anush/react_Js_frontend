import React, { useState } from "react";
import CategoryTabContent from "./Common/Item/CategoryTabContent";
import { Nav } from "react-bootstrap";

const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState(0);

  //common tab components
  const tabs = [
    { id: 0, title: "Add Book Category", component: <CategoryTabContent /> },
  ];


  return (
    <div className="d-flex">

      {/* [Start] - Sidebar */}
      <Nav className="nav-sidebar">
        {/* [Start] - Tabs in the sidebar */}
        {tabs.map((tab, index) => (
          <Nav.Link
            key={tab.id}
            onClick={() => setActiveTab(index)}
            className={activeTab === index ? "active" : ""}
          >
            {tab.title}
          </Nav.Link>
        ))}
        {/* [End] - Tabs in the sidebar */}
      </Nav>
      {/* [End] - Sidebar*/}


      {/* Render Tab-Specific Component */}
      <div className="p-4" style={{ width: "80%" }}>
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default AdminDashBoard;
