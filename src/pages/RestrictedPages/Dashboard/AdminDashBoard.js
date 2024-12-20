import React, { useState } from "react";
import CategoryTabContent from "./Common/Item/CategoryTabContent";
import { Nav } from "react-bootstrap";
import SubCategoryTabContent from "./Common/Item/SubCategoryTabContent";
import BookTabContent from "./Common/Item/BookTabContent";
import AuthorTabContent from "./Common/author/AuthorTabContent";
import OrderSummuryTabContent from "./Common/order/OrderSummuryTabContent";
import StaffTabContent from "./Common/user/StaffTabContent";

const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState(0);

  //common tab components
  const tabs = [
    { id: 0, title: "Book Categories", component: <CategoryTabContent /> },
    { id: 1, title: "Book Subcategories", component: <SubCategoryTabContent /> },
    { id: 2, title: "Authors", component: <AuthorTabContent /> },
    { id: 3, title: "Books", component: <BookTabContent /> },
    { id: 4, title: "Staff", component: <StaffTabContent /> },
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
