import {
  getAllOrdersByUserId,
} from "../../../../../services/OrderService";
import React, { useState, useEffect } from "react";
import OrderByCustomerTable from './orderReusableComponents/OrderByCustomerTable';
import "react-datepicker/dist/react-datepicker.css";

const CustomerOrderTabContent = () => {

  //API responses
  const [customerOrders, setCustomerOrders] = useState([]);

  //useEffect hook
  useEffect(() => {
    fetchAllOrdersForCustomer();
  }, []); //[] : means that the effect will run only once on the initial render

  //Arrow functions
  const fetchAllOrdersForCustomer = async () => {
    // get user_id from session storage
    const userId = sessionStorage.getItem("user_id");

    //call API for getAll
    const data = await getAllOrdersByUserId(userId);
    setCustomerOrders(data);
  };

  return (
    <div>
      <h5 className="mb-4">My Orders</h5>
      <div className="main-content-table-container">

        <OrderByCustomerTable tabName="Order History" data={customerOrders} />

      </div>
    </div>
  );
};

export default CustomerOrderTabContent;



