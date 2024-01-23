import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import { useCart } from '@/context/cartContextProvider';

function Shop({ medicines }) {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Medicine Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medicines.map((medicine) => (
          <div key={medicine._id} className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">{medicine.name}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Price:</strong> ₹ {medicine.price}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Batch Number:</strong> {medicine.batchNo}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Expiry Date:</strong> {medicine.expiryDate}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Quantity:</strong> {medicine.quantity}
            </p>
            <div className="flex items-center space-x-4">
              <AddToCartButton medicine={medicine}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/fetchMedicines`);
    const { medicines } = await response.json();

    return {
      props: {
        medicines: medicines,
      },
    };
  } catch (error) {
    console.error('Error fetching medicine on the server', error);
    return {
      props: {
        medicines: [],
      },
    };
  }
}

export default Shop;
