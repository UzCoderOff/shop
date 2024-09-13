import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "./ProductCard";
import { Skeleton } from "primereact/skeleton";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const searchTerm = params.get("query")?.toLowerCase();

        if (searchTerm) {
          const productsRef = collection(db, "products");
          const querySnapshot = await getDocs(productsRef);

          const searchedProducts = querySnapshot.docs
            .map((doc) => doc.data())
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm)
            );

          setProducts(searchedProducts);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location]);

  const skeletons = Array(12).fill(null);

  if (loading) {
    return (
      <div className="container mx-auto py-20 w-full">
        <h1 className="category-title">Search Results</h1>
        <div className="pt-10 grid xl:grid-cols-4 810:grid-cols-3 grid-cols-2 justify-center items-center gap-6">
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
      <h1 className="category-title">Search Results</h1>
      {products.length > 0 ? (
        <div className="pt-10 grid xl:grid-cols-4 810:grid-cols-3 grid-cols-2 justify-center items-center gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex align-middle h-[40vh]">
          <p>No products found for your search.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
