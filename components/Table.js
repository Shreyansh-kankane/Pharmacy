import React from "react";
import { useCart } from "@/context/cartContextProvider";
export default function Table() {

    const { cartState } = useCart();
    const { items } = cartState;
    const total = cartState.total;
    const list = items.map((item) => ({
      id: item._id,
      description: item.name,
      quantity: item.buy,
      price: item.price,
      amount: item.price * item.buy,
    }));

  return (
    <>
      <table width="100%" className="mb-10">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Medicine</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">Amount</td>
          </tr>
        </thead>
        {list.map(({ id, description, quantity, price, amount }) => (
          <React.Fragment key={id}>
            <tbody>
              <tr className="h-10">
                <td>{description}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{amount}</td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
      </table>

      <div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
          $ {total.toLocaleString()}
        </h2>
      </div>
    </>
  );
}
