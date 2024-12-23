import React, { useState } from "react";
import CategoryTabContent from "./common/item/CategoryTabContent";
import { Nav } from "react-bootstrap";
import SubCategoryTabContent from "./common/item/SubCategoryTabContent";
import BookTabContent from "./common/item/BookTabContent";
import AuthorTabContent from "./common/author/AuthorTabContent";
import OrderSummuryTabContent from "./common/order/OrderSummuryTabContent";
import UserProfileTabContent from "./common/user/UserProfileTabContent";

const ManagerDashBoard = () => {
  const [activeTab, setActiveTab] = useState(0);

  //common tab components
  const tabs = [
    { id: 0, title: "Profile", component: <UserProfileTabContent /> },
    { id: 1, title: "Book Categories", component: <CategoryTabContent /> },
    { id: 2, title: "Book Subcategories", component: <SubCategoryTabContent /> },
    { id: 3, title: "Authors", component: <AuthorTabContent /> },
    { id: 4, title: "Books", component: <BookTabContent /> },
    { id: 5, title: "Orders", component: <OrderSummuryTabContent /> },
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

export default ManagerDashBoard;
