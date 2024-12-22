import {
  getAllOrdersByOrderStatus,
  getAllOrdersByOrderDateAndStatus,
} from "../../../../../services/OrderService";
import React, { useState, useEffect } from "react";
import { Tab, Tabs } from 'react-bootstrap';
import OrderByStatusTable from './orderReusableComponents/OrderByStatusTable';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { OrderStatus } from "./../../../../../constants/ConstantValues";

const OrderSummuryTabContent = () => {
  const [activeKey, setActiveKey] = useState('tab1');
  const [selectedDate, setSelectedDate] = useState(new Date());  // Today's date by default

  //API responses
  const [pendingOrders, setPendingOrders] = useState([]);
  const [shippedOrders, setShippedOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);

  //useEffect hook
  useEffect(() => {
    // Obtain the current date in 'yyyy-MM-dd' format
    const currentDate = new Date().toLocaleDateString('en-CA'); // 'en-CA' format gives yyyy-MM-dd

    //At page loading
    fetchAllPendingOrders(); //All pendings without considering date
    fetchAllPendingOrdersForSelectedDate(currentDate); //for today
    fetchAllShippedOrdersForSelectedDate(currentDate); //for today
    fetchAllDeliveredOrdersForSelectedDate(currentDate); //for today
    fetchAllCancelledOrdersForSelectedDate(currentDate); //for today
  }, []); //[] : means that the effect will run only once on the initial render

  //Arrow functions
  const fetchAllPendingOrders = async () => {
    //call API for getAll
    const data = await getAllOrdersByOrderStatus({ checkedStatus: OrderStatus.PENDING });
    setPendingOrders(data);
  };

  const fetchAllPendingOrdersForSelectedDate = async (date) => {
    //call API for getAll
    const data = await getAllOrdersByOrderDateAndStatus({ checkedDate: date, checkedStatus: OrderStatus.PENDING });
    setPendingOrders(data);
  };

  const fetchAllShippedOrdersForSelectedDate = async (date) => {
    //call API for getAll
    const data = await getAllOrdersByOrderDateAndStatus({ checkedDate: date, checkedStatus: OrderStatus.SHIPPED });
    setShippedOrders(data);
  };

  const fetchAllDeliveredOrdersForSelectedDate = async (date) => {
    //call API for getAll
    const data = await getAllOrdersByOrderDateAndStatus({ checkedDate: date, checkedStatus: OrderStatus.DELIVERED });
    setDeliveredOrders(data);
  };

  const fetchAllCancelledOrdersForSelectedDate = async (date) => {
    //call API for getAll
    const data = await getAllOrdersByOrderDateAndStatus({ checkedDate: date, checkedStatus: OrderStatus.CANCELLED });
    setCancelledOrders(data);
  };

  // Handler for date selection, ensuring no future date is selected
  const handleDateChange = (selectedDateByDatePicker) => {
    if (selectedDateByDatePicker <= new Date()) { // Prevent future dates
      setSelectedDate(selectedDateByDatePicker);

      //call API to get orderby - orderstatus, and selected date
      fetchAllPendingOrdersForSelectedDate(getSelectedDateFormatted(selectedDateByDatePicker)); //for selected date
      fetchAllShippedOrdersForSelectedDate(getSelectedDateFormatted(selectedDateByDatePicker)); //for selected date
      fetchAllDeliveredOrdersForSelectedDate(getSelectedDateFormatted(selectedDateByDatePicker)); //for selected date
      fetchAllCancelledOrdersForSelectedDate(getSelectedDateFormatted(selectedDateByDatePicker)); //for selected date
    }
  };

  // Get the date in yyyy-MM-dd format
  const getSelectedDateFormatted = (date) => {
    return format(date, 'yyyy-MM-dd');
  };

  return (
    <div>
      <h5 className="mb-4">Orders</h5>
      <div className="main-content-table-container">
        <h2 className="main-content-table-title">Order Overview</h2>

        {/* [Start] - Date-picker */}
        <div className="datepicker-container" style={{ paddingBottom: '15px' }}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            maxDate={new Date()} // Disable future dates
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />
        </div>
        {/* [End] - Date-picker */}


        {/* [Start] - Tab View */}
        <Tabs className="mb-3" justify activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          <Tab eventKey="tab1" title={`Pending (${pendingOrders.length || 0})`}>
            <OrderByStatusTable tabName="Pending Orders" data={pendingOrders} />
          </Tab>
          <Tab eventKey="tab2" title={`Shipped (${shippedOrders.length || 0})`}>
            <OrderByStatusTable tabName="Shipped Orders" data={shippedOrders} />
          </Tab>
          <Tab eventKey="tab3" title={`Delivered (${deliveredOrders.length || 0})`}>
            <OrderByStatusTable tabName="Delivered Orders" data={deliveredOrders} />
          </Tab>
          <Tab eventKey="tab4" title={`Cancelled (${cancelledOrders.length || 0})`}>
            <OrderByStatusTable tabName="Cancelled Orders" data={cancelledOrders} />
          </Tab>
        </Tabs>
        {/* [End] - Tab View */}
      </div>
    </div>
  );
};

export default OrderSummuryTabContent;
