import React from 'react';
import { useCart } from '@/context/cartContextProvider';
import Item from '@/components/Item';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

function Cart() {
  const { cartState,dispatch} = useCart();
  const router = useRouter();   
  const handleCheckout = () => {
    toast.success('Checkout success!');
    
    router.push('/Customer/order')
    return;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>

      {cartState.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className=''>
          {cartState.items.map((item) => (
            <Item key={item._id} item={item}/>
          ))}
          <p className="text-lg font-semibold mt-4 text-end">
            Total: ${cartState.total}
          </p>
          <div className='flex justify-end mt-4'>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                onClick={handleCheckout}
            >
                Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
