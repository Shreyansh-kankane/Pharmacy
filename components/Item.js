import React,{useState} from 'react'
import { useCart } from '@/context/cartContextProvider';

function Item({item}) {
    const { dispatch } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleInputChange = (value) => {
        if(value == '') {
            setQuantity(value);
            dispatch({
                type: 'UPDATE_QUANTITY',
                payload: { ...item, quantity: 1 },
            });
        }
        else {
            setQuantity(value);
            dispatch({
                type: 'UPDATE_QUANTITY',
                payload: { ...item, quantity: value },
            });
        }
        
        return;
    }
    
  return (
    <div key={item._id} className="flex bg-white p-6 rounded-md shadow-md mb-4 relative">
        <div className='flex-1'>
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-700 mb-2">
                <strong>Price:</strong> ${item.price}
            </p>
            <div className='flex justify-between'>
                <p className="text-gray-700">
                    <strong>Quantity:</strong> {quantity ? quantity : 1}
                </p>
                <input
                    type='number'
                    placeholder='Enter quantity'
                    value={quantity}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className='px-2 py-1 border border-gray-300 rounded'
                />
            </div>
            <div className='flex justify-between'>
                <p className="text-gray-700">
                    <strong>Total:</strong> 
                </p>
                <p className="text-gray-700">
                    <strong>${item.price * (quantity ? quantity: 1)}</strong>
                </p>
            </div>
        </div>
  
        <button 
            className='absolute top-0 right-0 mt-2 mr-2'
            onClick={() => {
                let buy = quantity ? quantity : 1;
                dispatch({
                    type: 'REMOVE_FROM_CART',
                    payload: { ...item, buy},
                });
            }}
        >
            <div className='rounded-full w-6 h-6 bg-red-300'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </button>
    </div>
  )
}

export default Item