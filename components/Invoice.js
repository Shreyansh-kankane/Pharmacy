// components/Invoice.js
import React from 'react';

function Invoice({ purchasedItems }) {
  return (
    <div className="invoice-container">

      <h1 className="text-3xl font-bold mb-4">Invoice</h1>

      <div className="user-info">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <p>Name: Shreyansh</p>
        <p>Email: abc@g.com</p>
      
      </div>

      <div className="purchased-items">
        <h2 className="text-xl font-semibold mb-2">Purchased Items</h2>
        {purchasedItems.map((item) => (
          <div key={item.batchNo} className="item">
            <p>Name: {item.name}</p>
            <p>Price: ₹ {item.price}</p>
            <p>Quantity: {item.quantity}</p>
        
          </div>
        ))}
      </div>

      <div className="distributor-info">
        <h2 className="text-xl font-semibold mb-2">Distributor Information</h2>
        <p>Name: {distributor.name}</p>
        <p>Address: {distributor.address}</p>
       
      </div>
    </div>
  );
}

export default Invoice;
