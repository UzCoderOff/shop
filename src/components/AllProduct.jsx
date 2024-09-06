import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from './ProductCard'

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className='w-[80vh]'>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 ">
      <h1 className="category-title">All Products</h1>
      <div className="pt-5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-[80vh]">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard product={product}/>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
