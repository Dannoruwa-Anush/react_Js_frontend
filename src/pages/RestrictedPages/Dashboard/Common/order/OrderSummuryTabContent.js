import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import OrderByStatusTable from './orderReusableComponents/OrderByStatusTable';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const OrderSummuryTabContent = () => {
  const [activeKey, setActiveKey] = useState('tab1');
  const [selectedDate, setSelectedDate] = useState(new Date());  // Today's date by default

  // API call to get order by status and date
  const data = [
    { id: 1, totalAmount: 100, createdAt: '2024-12-16', customerName: 'AA 1' },
    { id: 2, totalAmount: 200, createdAt: '2024-12-16', customerName: 'BB 2' },
    { id: 3, totalAmount: 300, createdAt: '2024-12-16', customerName: 'CC 3' },
  ];

  // Handler for date selection, ensuring no future date is selected
  const handleDateChange = (date) => {
    if (date <= new Date()) { // Prevent future dates
      setSelectedDate(date);
    }
  };

  // Get the selected date in yyyy-MM-dd format
  const getSelectedDateFormatted = () => {
    return format(selectedDate, 'yyyy-MM-dd');
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
          <Tab eventKey="tab1" title={`Pending (${data.length})`}>
            <OrderByStatusTable tabName="Pending Orders" data={data} />
          </Tab>
          <Tab eventKey="tab2" title={`Shipped (${data.length})`}>
            <OrderByStatusTable tabName="Shipped Orders" data={data} />
          </Tab>
          <Tab eventKey="tab3" title={`Delivered (${data.length})`}>
            <OrderByStatusTable tabName="Delivered Orders" data={data} />
          </Tab>
        </Tabs>
        {/* [End] - Tab View */}
      </div>
    </div>
  );
};

export default OrderSummuryTabContent;
