import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

const Cart = () => {
  const cart = useSelector((state: any) => state.cart);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        {cart.items?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.items?.map((item: any) => (
              <div 
                key={item.id} 
                className="bg-white shadow rounded-lg p-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-8 flex justify-end">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="text-lg font-bold">
                    ${cart.items?.reduce((total: number, item: any) => total + item.price, 0).toFixed(2)}
                  </span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;