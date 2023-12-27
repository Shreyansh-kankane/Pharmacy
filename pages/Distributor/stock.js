import React, { useState } from 'react';

const Stock = () => {
    const medicines = [
    {
        name: 'Paracetamol',
        price: 10,
        batchNo: '12345',
        expiryDate: '2022-12-31',
        quantity: 100,
        supplierName: 'Rohan Medicals Pvt. Ltd.',
        stackNo: 'A1'
    },
    {
        name: 'Aspirin',
        price: 15,
        batchNo: '67890',
        expiryDate: '2023-06-30',
        quantity: 50,
        supplierName: 'Dvwedi Medicals Pvt. Ltd.',
        stackNo: 'B2'
    },
    {
        name: 'Cetrizine',
        price: 20,
        batchNo: '24680',
        expiryDate: '2023-12-31',
        quantity: 75,
        supplierName: 'Triphati Medicals',
        stackNo: 'C3'
    },
    {
        name: 'Cough Syrup',
        price: 30,
        batchNo: '13579',
        expiryDate: '2024-06-30',
        quantity: 25,
        supplierName: 'Lucknow Pharmacy store ',
        stackNo: 'D4'
    },
    {
        name: 'Vitamin C',
        price: 25,
        batchNo: '24680',
        expiryDate: '2024-12-31',
        quantity: 60,
        supplierName: 'Bhopal Medicals Pvt. Ltd.',
        stackNo: 'E5'
    },
    {
        name: 'Vitamin D',
        price: 25,
        batchNo: '24680',
        expiryDate: '2024-12-31',
        quantity: 60,
        supplierName: 'Bhopal Medicals Pvt. Ltd.',
        stackNo: 'E5'
            },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [filterMedicine,setFilterMedicine] = useState(medicines);

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
        console.log(event.target.value);  
        const filter = handleFilterMedicine(event.target.value);
        setFilterMedicine(filter);  
    };

    function handleFilterMedicine(term){
        const filter = medicines.filter((medicine) => {
            const { name, batchNo, supplierName, stackNo } = medicine;
            const searchValue = term.toLowerCase();
            return (
                name.toLowerCase().includes(searchValue) ||
                batchNo.toLowerCase().includes(searchValue) ||
                supplierName.toLowerCase().includes(searchValue) ||
                stackNo.toLowerCase().includes(searchValue)
            );
        });
        console.log(filter);
        return filter;
    }
    
    return (
        <div className='flex flex-col items-center'>
            <h1 className='font-bold text-2xl mt-4'>Your stock</h1>

            <div className='w-full flex justify-center items-center space-x-2'>
                <h1>Search: </h1>
                <input
                    type='text'
                    placeholder='Search by name, batch no, supplier name, stack no'
                    value={searchTerm}
                    onChange={handleSearchInput}
                    className='my-4 px-2 py-1 border border-gray-300 rounded w-1/2'
                />

            </div>

            <table className='w-3/4'>
            <thead>
                     <tr>
                         <th style={{ border: '1px solid black' }}>Name</th>
                         <th style={{ border: '1px solid black' }}>Price</th>
                         <th style={{ border: '1px solid black' }}>Batch No</th>
                         <th style={{ border: '1px solid black' }}>Expiry Date</th>
                         <th style={{ border: '1px solid black' }}>Quantity</th>
                         <th style={{ border: '1px solid black' }}>Supplier Name</th>
                         <th style={{ border: '1px solid black' }}>Stack No</th>
                     </tr>
                 </thead>
                 <tbody>
                     {filterMedicine.map((medicine, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black' }} className="text-center">{medicine.name}</td>
                            <td style={{ border: '1px solid black' }} className="text-center">{medicine.price}</td>
                            <td style={{ border: '1px solid black' }} className="text-center">{medicine.batchNo}</td>
                            <td style={{ border: '1px solid black' }} className="text-center">{medicine.expiryDate}</td>
                            <td style={{ border: '1px solid black' }} className="text-center">{medicine.quantity}</td>
                            <td style={{ border: '1px solid black' }} className="text-center">{medicine.supplierName}</td>
                            <td style={{ border: '1px solid black' }} className="text-center">{medicine.stackNo}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default Stock;
