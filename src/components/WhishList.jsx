import React, { useState, useEffect } from 'react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(storedWishlistItems);
  }, []);

  const removeItem = (id) => {
    const updatedItems = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedItems);
    localStorage.setItem('wishlist', JSON.stringify(updatedItems));
  };

  return (
    <div className="container mx-auto p-6 h-[80vh]"> 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2 overflow-y-auto">
          {wishlistItems.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-4 border-b text-left">Product</th>
                  <th className="px-6 py-4 border-b text-right">Price</th>
                  <th className="px-6 py-4 border-b text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <img src={item.images[3]} alt={item.name} className="inline-block h-16 mr-4" />
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-right">${item.price}</td>
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
              <h2 className="text-2xl font-semibold">Your wishlist is empty!</h2>
              <p className="mt-4">You haven't added any items to your wishlist yet.</p>
              <button
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={() => window.location.href = '/'}
              >
                Return to Shop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
