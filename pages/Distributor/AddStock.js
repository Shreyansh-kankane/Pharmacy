// MedicineForm.js
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const MedicineForm = () => {

  const {data:session} = useSession();
// session.user {name: 'Akash Pharmacy', email: 'abc@g.com', id: '6584753e3491fb311a46cb6f', role: 'distributor', address: 'Ram Nagar Orai Jalaun, UP'}

  const [medicine, setMedicine] = useState({
    name: '',
    price: '',
    batchNo: '',
    expiryDate: '',
    quantity: '',
    stackNo: '',
    distributorId: session?.user?.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prevMedicine) => ({ ...prevMedicine, [name]: value }));
  };

  const addMedicine = () => {
    fetch('/api/MedicineStock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicine),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.success){
            toast.success(data.message);
            setMedicine({
                name: '',
                price: '',
                batchNo: '',
                expiryDate: '',
                quantity: '',
                stackNo: '',
              });
        }
        else {
            toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 rounded shadow-md max-w-md">
        <label className="block mb-2" htmlFor="name">
          Medicine Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={medicine.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2" htmlFor="price">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={medicine.price}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2" htmlFor="batchNo">
          Batch Number:
        </label>
        <input
          type="text"
          id="batchNo"
          name="batchNo"
          value={medicine.batchNo}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2" htmlFor="expiryDate">
          Expiry Date:
        </label>
        <input
          type="date"
          id="expiryDate"
          name="expiryDate"
          value={medicine.expiryDate}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2" htmlFor="quantity">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={medicine.quantity}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2" htmlFor="stackNo">
          Stack Number:
        </label>
        <input
          type="text"
          id="stackNo"
          name="stackNo"
          value={medicine.stackNo}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <button
          type="button"
          onClick={addMedicine}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add / Update Stock
        </button>
      </form>
    </div>
  );
};

export default MedicineForm;
