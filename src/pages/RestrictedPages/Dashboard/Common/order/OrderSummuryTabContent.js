// TabsComponent.js
import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import OrderByStatusTable from './orderReusableComponents/OrderByStatusTable';

const OrderSummuryTabContent = () => {
  const [activeKey, setActiveKey] = useState('tab1');

  // Define the data array here
  const data = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
    { id: 3, name: 'Item 3', description: 'Description 3' },
  ];

  return (
    <div>
      <h5 className="mb-4">Orders Summury</h5>

      <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)} id="tabs-example">
        <Tab eventKey="tab1" title="Tab 1">
          <OrderByStatusTable tabName="Tab 1" data={data}/>
        </Tab>
        <Tab eventKey="tab2" title="Tab 2">
          <OrderByStatusTable tabName="Tab 2" data={data}/>
        </Tab>
        <Tab eventKey="tab3" title="Tab 3">
          <OrderByStatusTable tabName="Tab 3" data={data}/>
        </Tab>
      </Tabs>
    </div>

  );
};

export default OrderSummuryTabContent;

