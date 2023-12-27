import React from 'react'
import { useState } from 'react';

function PurchaseItem({item:medicine, onPurchase}) {
    const [quantity, setQuantity] = useState(0);

  return (
    <div className="flex justify-between items-center border-2 rounded-md p-2 mt-2">
        <div className='flex space-x-4'>
            <h2 className="text-xl font-bold">{medicine.name}</h2>
            <p className="text-lg">Price: {medicine.price}</p>
            <p className='text-sm'>{medicine.supplerName}</p>
        </div>
        <div>
            <input
                type="number"
                className="border-2 rounded-md p-1"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <button
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => onPurchase(medicine, quantity)}
            >
                Purchase
            </button>
        </div>
    </div>
  )
}

export default PurchaseItem;