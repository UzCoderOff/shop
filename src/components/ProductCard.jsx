import React, { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [fav, setFav] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.some((item) => item.id === product.id);
  });
  const nav = useNavigate();

  const handleWishlist = (e) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updatedWishlist = fav
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setFav(!fav);
  };

  const handleCart = (e) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div
      onClick={() => nav(`/product/${product.id}`)}
      className="w-full sm:w-64 h-auto flex flex-col relative z-10 card cursor-pointer rounded-md"
    >
      <div className="h-56 sm:h-64 bg-[#f5f5f5] rounded-md flex justify-center items-center relative z-10 overflow-hidden">
        {product.discountPercent != 0 && (
          <div className="absolute bg-primary top-2 left-2 text-white px-2 rounded-md text-sm z-20">
            -{product.discountPercent}%
          </div>
        )}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 bg-white p-1 rounded-full z-10"
        >
          <Heart
            color="#111"
            size={18}
            fill={fav ? "red" : "white"}
            stroke={fav ? "red" : "#000"}
          />
        </button>
        <img
          src={product.images && product.images[0]}
          alt={product.name}
          className="photo z-0 w-full h-full object-contain transition-all duration-300"
          draggable={false}
        />
      </div>
      <div className="flex flex-col px-2 py-1 text-left items-start relative z-10">
        <h1 className="font-sans font-medium text-xl">{product.name}</h1>
        {product.discountPercent ? (
          <div className="flex justify-center">
            <h1 className="text-primary">${product.price}</h1>
            <h1 className="pl-3 line-through">
              ${Math.round((product.price * 100) / (100 - product.discountPercent))}
            </h1>
          </div>
        ) : (
          <div className="flex justify-center">
            <h1 className="text-primary">${product.price}</h1>
          </div>
        )}
        <div className="flex justify-center items-center gap-1">
          <img
            src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000"
            alt="Star"
            width={16}
          />
          <h1 className="text-sm">
            {product.rating}({product.peopleRated})
          </h1>
        </div>
        <button
          onClick={handleCart}
          className="absolute p-2 border-2 right-2 bottom-2 rounded-full"
        >
          <ShoppingBag color="#111" size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
