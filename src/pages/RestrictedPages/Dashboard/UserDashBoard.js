import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import CustomerOrderTabContent from "./common/order/CustomerOrderTabContent";

const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState(0);

  //common tab components
  const tabs = [
    { id: 0, title: "My Orders", component: <CustomerOrderTabContent /> }
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


      {/* [Start] - Render Tab-Specific Component */}
      <div className="main-content">
        {tabs[activeTab].component}
      </div>
      {/* [End] - Render Tab-Specific Component */}
      
    </div>
  );
};

export default AdminDashBoard;
