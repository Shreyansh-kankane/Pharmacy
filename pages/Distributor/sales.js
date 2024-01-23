import React from 'react';
import getUser from '@/utils/getUser';
import { useState, useEffect } from 'react';

function Sales() {
  const user = getUser();
  const [sales, setSales] = useState([]);

  const getOrders = async (id) => {
    const res = await fetch(`/api/fetchOrder/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ distributorId: id }),
    });
    const data = await res.json();
    setSales(data.orders);
    console.log(data.orders);
  };

  useEffect(() => {
    if (user) {
      getOrders(user.id);
    }
  }, [user]);

  if(sales.length == 0){
    return <h1 className='text-3xl font-bold text-center mt-4'>No Orders lined Up</h1>
  }

  return (
    <div className='px-10 py-8'>
      <h1 className='text-2xl font-bold text-center m-4'>Your Orders</h1>
      
      <table className="table-auto w-full border-collapse border border-green-800">
        <thead>
          <tr>
            <th className="border border-green-600 px-4 py-2">Order ID</th>
            <th className="border border-green-600 px-4 py-2">Customer Name</th>
            <th className="border border-green-600 px-4 py-2">Customer Email</th>
            <th className="border border-green-600 px-4 py-2">Customer Phone</th>  
            <th className="border border-green-600 px-4 py-2">Medicines</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 && sales.map((order) => (
            <tr key={order._id}>
              <td className="border border-green-600 px-4 py-2">{order._id}</td>
              <td className="border border-green-600 px-4 py-2">{order.client.name}</td>
              <td className="border border-green-600 px-4 py-2">{order.client.email}</td>
              <td className="border border-green-600 px-4 py-2">{order.client.phone}</td>
              <td className="border border-green-600 px-4 py-2">
                <ul>
                  {order.medicines.map((medicine) => (
                    <li key={medicine._id}>
                      {medicine.name} - Quantity: {medicine.buy}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
