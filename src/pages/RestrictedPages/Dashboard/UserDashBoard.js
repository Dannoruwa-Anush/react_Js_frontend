import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import CustomerOrderTabContent from "./common/order/CustomerOrderTabContent";
import UserProfileTabContent from "./common/user/UserProfileTabContent";

const UserDashBoard = () => {
  const [activeTab, setActiveTab] = useState(0);

  //common tab components
  const tabs = [
    //{ id: 0, title: "Profile", component: <UserProfileTabContent /> },
    { id: 1, title: "Orders", component: <CustomerOrderTabContent /> },
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
            {index === 0 ? ( // Check if the tab is the "Profile" tab
              <i className="bi bi-person-vcard-fill" style={{ fontSize: "1.5rem" }}></i>
            ) : (
              tab.title
            )}
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

export default UserDashBoard;
