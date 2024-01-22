import React, {useState} from 'react'
import { useCart } from '@/context/cartContextProvider';

function AddToCartButton({medicine}) {
    const { cartState, dispatch } = useCart();

    const disable = cartState.items.filter(item => item._id === medicine._id).length > 0;

    const [add,setAdd] = useState(false);
    const handleAddToCart = (medicine) => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { ...medicine,buy:1 },
      });
      setAdd(true);
    };
  
  return (
    <button
        disabled={add || disable}
        onClick={() => handleAddToCart(medicine)}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
        {add ? '✅ Added' : 'Add to Cart'}
    </button>
  )
}

export default AddToCartButton