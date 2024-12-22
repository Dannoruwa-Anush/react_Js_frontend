import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import OrderByStatusTable from './orderReusableComponents/OrderByStatusTable';

const OrderSummuryTabContent = () => {
  const [activeKey, setActiveKey] = useState('tab1');

  // API call to get order by status and date
  const data = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
    { id: 3, name: 'Item 3', description: 'Description 3' },
  ];

  return (
    <div>
      <h5 className="mb-4">Orders</h5>
      <div className="main-content-table-container">
        <h2 className="main-content-table-title">order overview</h2>

        {/* [Start] - Tab View */}
        <Tabs className="mb-3" justify activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          <Tab eventKey="tab1" title={`Pending (${data.length})`}> {/* Ex: Pending (10) */}
            <OrderByStatusTable tabName="Pending Orders" data={data} />
          </Tab>
          <Tab eventKey="tab2" title={`Shipped (${data.length})`}> {/* Ex: Shipped (10) */}
            <OrderByStatusTable tabName="Shipped Orders" data={data} />
          </Tab>
          <Tab eventKey="tab3" title={`Delivered (${data.length})`}> {/* Ex: Delivered (10) */}
            <OrderByStatusTable tabName="Delivered Orders" data={data} />
          </Tab>
        </Tabs>
        {/* [End] - Tab View */}

      </div>
    </div>
  );
};

export default OrderSummuryTabContent;

