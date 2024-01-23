import React, { useState,useEffect } from 'react';
import getUser from '@/utils/getUser';

const Stock = () => {
    const user = getUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterMedicine,setFilterMedicine] = useState([]);
    const [medicines, setMedicine] = useState([]);

    const fetchMedicines = async (id) => {
        const res = await fetch(`/api/MedicineStock/?distributorId=${id}`);
        const data = await res.json();
    
        setMedicine(data.medicines);
        setFilterMedicine(data.medicines);
    }

    useEffect(() => {
        if(user){
            fetchMedicines(user.id);
        }
    },[user])



    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
        console.log(event.target.value);  
        const filter = handleFilterMedicine(event.target.value);
        setFilterMedicine(filter);  
    };

    function handleFilterMedicine(term){
        const filter = medicines.filter((medicine) => {
            const { name, batchNo, stackNo } = medicine;
            const searchValue = term.toLowerCase();
            return (
                name.toLowerCase().includes(searchValue) ||
                batchNo.toLowerCase().includes(searchValue) ||
                stackNo.toLowerCase().includes(searchValue)
            );
        });
        console.log(filter);
        return filter;
    }

    if( filterMedicine.length == 0){
        return <h1 className='text-3xl font-bold text-center mt-4'>No Medicines in Stock</h1>
    }
    
    return (
        <div className='flex flex-col items-center'>
            <h1 className='font-bold text-2xl mt-4'>Your stock</h1>

            <div className='w-full flex justify-center items-center space-x-2'>
                <h1>Search: </h1>
                <input
                    type='text'
                    placeholder='Search by name, batch no, stack no'
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
                            <td style={{ border: '1px solid black' }} className="text-center">{medicine.stackNo}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default Stock;


