import React from 'react'
import { useState } from 'react';
import PurchaseItem from './PurchaseItem';

function purchase() {

    const [quantity, setQuantity] = useState(0);

    const medicines = [
        { name: 'Paracetamol', price: 10, supplerName: 'Rohan Medicals Pvt. Ltd.' },
        { name: 'Aspirin', price: 15 , supplerName: 'Dvwedi Medicals Pvt. Ltd.' },
        { name: 'Cetrizine', price: 20 , supplerName: 'Triphati Medicals' },
        { name: 'Vitamin C', price: 25 , supplerName: 'Bhopal Medicals Pvt. Ltd.' },
        { name: 'Vitamin D', price: 25 , supplerName: 'Bhopal Medicals Pvt. Ltd.' },
        { name: 'Cough Syrup', price: 30 ,  supplerName: 'Lucknow Pharmacy store.' },
    ];


    const handlePurchase = (medicine) => {
        if(quantity <= 0){
            alert('Please enter a valid quantity');
            return;
        } 
        console.log(medicine, quantity);
        alert('Purchase Successful');
    };

    return (
        <div>
            <h1 className="text-3xl text-center mt-4">Purchase Medicine</h1>
            <div className="p-4 w-1/2 mx-auto ">
                {medicines.map((medicine) => (
                    <PurchaseItem item={medicine} onPurchase={handlePurchase} />
                ))}
            </div>
        </div>
    );
}

export default purchase