import React, { useState, useEffect } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [query, setQuery] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const searchProduct = (event) => {
    setQuery(event.query);
    const results = products.filter(product =>
      product.name.toLowerCase().includes(event.query.toLowerCase())
    );
    setFilteredProducts(results);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      nav(`/product/${selectedProduct.id}`);
    } else if (query) {
      nav(`/search?query=${query}`);
    }
    setSelectedProduct(null);
  };

  const itemTemplate = (item) => {
    return (
      <div className="flex align-items-center">
        <img src={item.images[0]} alt={item.name} className="inline-block h-16 mr-4" />
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <form 
      className="bg-[#f5f5f5] p-2 flex flex-row align-middle justify-center px-3 pl-5 gap-8 py-2 w-full"
      onSubmit={handleSearch}
    >
      <AutoComplete
        value={query}
        suggestions={filteredProducts}
        completeMethod={searchProduct}
        field="name"
        onChange={(e) => {
          setQuery(e.value);
          setSelectedProduct(null);
        }}
        onSelect={(e) => setSelectedProduct(e.value)}
        placeholder="What are you looking for?"
        itemTemplate={itemTemplate}
        inputStyle={{
          backgroundColor: 'transparent',
          width: '100%',
          boxShadow: 'none',
        }}
      />
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 30 30"
        >
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg>
      </button>
    </form>
  );
};

export default Search;
