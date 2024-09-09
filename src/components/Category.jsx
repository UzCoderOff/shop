import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProductCard from "./ProductCard";
import { Skeleton } from "primereact/skeleton";
import { useParams } from "react-router-dom";

const Category = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const q = query(productsCollection, where("category", "==", name.toLowerCase()));
        const productSnapshot = await getDocs(q);
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [name]); 

  const skeletons = Array(12).fill(null);

  if (loading) {
    return (
      <div className="container mx-auto py-20 w-full">
        <h1 className="category-title">{name.toUpperCase()}</h1>
        <div className="grid xl:grid-cols-4 810:grid-cols-3 grid-cols-2 justify-center items-center gap-6">
          {skeletons.map((_, index) => (
            <div key={index} className="p-4 rounded-md">
              <Skeleton width="60%" height="220px" />
              <Skeleton width="60%" height="20px" className="mt-2" />
              <Skeleton width="30%" height="20px" className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 w-full">
      <h1 className="category-title">{name.toUpperCase()}</h1>
      <div className="grid xl:grid-cols-4 pt-10 810:grid-cols-3 grid-cols-2 justify-center items-center gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="category-title">No products available</div>
        )}
      </div>
    </div>
  );
};

export default Category;
