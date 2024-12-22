import React, { useState } from "react";
import CategoryTabContent from "./Common/Item/CategoryTabContent";
import { Nav } from "react-bootstrap";
import SubCategoryTabContent from "./Common/Item/SubCategoryTabContent";
import BookTabContent from "./Common/Item/BookTabContent";
import AuthorTabContent from "./Common/author/AuthorTabContent";
import OrderSummuryTabContent from "./Common/order/OrderSummuryTabContent";
import StaffTabContent from "./Common/user/StaffTabContent";
import UserProfileTabContent from "./Common/user/UserProfileTabContent";

const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState(0);

  //common tab components
  const tabs = [
    { id: 0, title: "Profile", component: <UserProfileTabContent /> },
    { id: 1, title: "Book Categories", component: <CategoryTabContent /> },
    { id: 2, title: "Book Subcategories", component: <SubCategoryTabContent /> },
    { id: 3, title: "Authors", component: <AuthorTabContent /> },
    { id: 4, title: "Books", component: <BookTabContent /> },
    { id: 5, title: "Staff", component: <StaffTabContent /> },
    { id: 6, title: "Orders", component: <OrderSummuryTabContent /> },
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
              <i class="bi bi-person-vcard-fill" style={{ fontSize: "1.5rem" }}></i>
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

export default AdminDashBoard;
