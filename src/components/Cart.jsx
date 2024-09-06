import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
    calculateTotal(storedCartItems);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  return (
    <div className="container mx-auto p-6 h-[80vh]"> 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full"> 
        <div className="lg:col-span-2 overflow-y-auto">
          {cartItems.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-4 border-b text-left">Product</th>
                  <th className="px-6 py-4 border-b text-right">Price</th>
                  <th className="px-6 py-4 border-b text-center">Quantity</th>
                  <th className="px-6 py-4 border-b text-right">Subtotal</th>
                  <th className="px-6 py-4 border-b text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <img src={item.images[3]} alt={item.name} className="inline-block h-16 mr-4" />
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-right">${item.price}</td>
                    <td className="px-6 py-4 text-center">
                      <select
                        className="border rounded px-2 py-1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      >
                        {[...Array(10).keys()].map(num => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full h-full text-center p-6 bg-white border border-gray-200 rounded-lg">
              <h2 className="text-2xl font-semibold">Your cart is empty!</h2>
              <p className="mt-4">Looks like you haven't added anything to your cart yet.</p>
              <button
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={() => window.location.href = '/'}
              >
                Return to Shop
              </button>
            </div>
          )}
        </div>

        <div>
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border border-gray-200 rounded-lg h-full">
              <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
              <p className="mb-2">Subtotal: ${totalPrice.toFixed(2)}</p>
              <p className="mb-2">Shipping: Free</p>
              <p className="mb-4">Total: ${totalPrice.toFixed(2)}</p>
              <button
                className="bg-red-500 text-white py-2 px-4 w-full rounded hover:bg-red-600"
                onClick={() => window.location.href = '/checkout'}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
