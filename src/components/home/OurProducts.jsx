import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { Skeleton } from 'primereact/skeleton';

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsQuery = query(productsCollection, limit(8));
        const productsSnapshot = await getDocs(productsQuery);
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const skeletons = Array(8).fill(null);

  return (
    <div className="py-6">
      <h1 className="category-title">Our Products</h1>
      <h1 className="pt-3 font-bold text-3xl pb-2">Explore Our Products</h1>
      <div className="grid xl:grid-cols-4 810:grid-cols-3 grid-cols-2 justify-center items-center gap-6">
        {loading ? (
          skeletons.map((_, index) => (
            <div key={index} className="p-4 rounded-md">
              <Skeleton width="60%" height="220px" />
              <Skeleton width="60%" height="20px" className="mt-2" />
              <Skeleton width="30%" height="20px" className="mt-2" />
            </div>
          ))
        ) : (
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        )}
      </div>
      <div className="flex align-middle justify-center items-center pt-8">
        <Link to={'/all'}>
          <button className="bg-primary text-white text-center py-2 px-3 rounded-md">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OurProducts;
