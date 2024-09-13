import React, { useEffect, useState } from "react";
import Search from "./Search";
import { Heart, ShoppingCart, UserRound } from "lucide-react";
import Badge from "../Badge";
import { useNavigate } from "react-router-dom";

const NavbarDesktop = () => {
  const nav = useNavigate()
  const [whishlist, setWhishlist] = useState([])
  const [cart, setCart] = useState([])

  const handleWishlist = (e) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) ;
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCart(cart)
    setWhishlist(wishlist)
  };

  useEffect(() => {
    handleWishlist()    
  }, [])
  

  return (
    <nav className="border-b-[1.5px] pb-4 pt-10 px-4 md:px-[9.3%]">
      <div className="flex flex-row items-center justify-between">
        <a href="/">
          <h1 className="text-2xl font-bold font-sans">Exclusive</h1>
          </a>
        <div className="hidden lg:flex flex-row items-center justify-between space-x-6">
          <a
            href="#"
            className="font-sans font-normal text-base text-black hover:text-gray-500 transition-colors duration-300"
            aria-label="Home"
          >
            Home
          </a>
          <a
            href="#footer"
            className="font-sans font-normal text-base text-black hover:text-gray-500 transition-colors duration-300"
            aria-label="Contact"
          >
            Contact
          </a>
          <a
            href="#"
            className="font-sans font-normal text-base text-black hover:text-gray-500 transition-colors duration-300"
            aria-label="About"
          >
            About
          </a>
        </div>
        <div className="flex flex-row items-center justify-between space-x-4">
          <div className="px-5">
            <Search />
          </div>
          <div className="flex items-center justify-center space-x-4">
            <button className="relative hover:bg-gray-300 p-2 transition-all duration-300 rounded-full" aria-label="Wishlist" onClick={()=> nav('/whishlist')}>
              {whishlist && whishlist.length > 0 && <Badge num={whishlist.length} />}
              <Heart size={28} strokeWidth={1.75} />
            </button>
            <button className="relative hover:bg-gray-300 p-2 transition-all duration-300 rounded-full" aria-label="Cart" onClick={()=> nav('/cart')}>
              {cart && cart.length > 0 && <Badge num={cart.length} />}
              <ShoppingCart size={28} strokeWidth={1.75} />
            </button>
            {/* <button className="relative hover:bg-gray-300 p-2 transition-all duration-300 rounded-full" aria-label="User Profile">
              <UserRound size={28} strokeWidth={1.75} />
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDesktop;
