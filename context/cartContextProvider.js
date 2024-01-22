import React, { createContext, useReducer, useContext } from 'react';

const initialCartState = {
  items: [],
  total: 0
};

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price * action.payload.buy,
      };
    case 'REMOVE_FROM_CART':

      return {
        ...state,
        total: state.total - action.payload.price * action.payload.buy,
        items: state.items.filter((item) => item._id !== action.payload._id),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id
            ? { ...item, buy: action.payload.quantity }
            : item
        ),
        total: state.items.reduce((acc,item)=>item._id === action.payload._id ? acc += item.price * action.payload.quantity : acc += item.price * item.buy,0)
      };




    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
