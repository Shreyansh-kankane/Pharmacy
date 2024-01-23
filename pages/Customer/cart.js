import React from 'react';
import { useCart } from '@/context/cartContextProvider';
import Item from '@/components/Item';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import getUser from '@/utils/getUser';

function Cart() {
  const { cartState,dispatch} = useCart();
  const user = getUser();
  console.log(user);
  const router = useRouter();   
  const handleCheckout = () => {
    dispatch({type:'CHECKOUT'});
    fetch('/api/orderHandler',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cart: cartState,client:user}),
    }).then((response) => {
      if(response.ok){
        toast.success('Order Placed Successfully');
        router.push('/Customer/order');
      }
      else{
        toast.error('Error in placing order');
      }
    }).catch((error) => {
      console.error('Error:', error);
      toast.error('Error in placing order');
    })
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
            Total: ₹{cartState.total}
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
