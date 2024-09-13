import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Heart, House, ShoppingCart, UserRound } from "lucide-react";
import Badge from "../Badge";
import { useNavigate } from "react-router-dom";

const NavbarMobile = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const nav = useNavigate()

  const handleChange = (e) => {
    setSelectedItem(e.value);
  };

  return (
    <>
      <div className="bg-[#f5f5f5] p-2 flex flex-row items-center justify-start px-3 gap-8 py-2 w-full rounded-lg mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 30 30"
        >
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg>
        <div className="flex-grow">
          <AutoComplete
            className="w-[96%] mr-4"
            value={selectedItem}
            onChange={handleChange}
            placeholder="What are you looking for?"
            inputStyle={{
              backgroundColor: "transparent",
              width: "100%",
              boxShadow: "none",
            }}
          />
        </div>
      </div>
      <div className="fixed bottom-0 right-0 w-full border-t-2 h-12 flex flex-row align-middle items-center justify-evenly bg-white z-50">
        <House size={28} strokeWidth={1.75} onClick={()=> nav('/')}/>
        <div className="relative" onClick={()=> nav('/cart')} >
          <Badge num={2} />
          <ShoppingCart size={28} strokeWidth={1.75} />
        </div>
        <div className="relative" onClick={()=> nav('/whishlist')}>
          <Badge num={"9+"} />
          <Heart size={28} strokeWidth={1.75} />
        </div>
        {/* <UserRound size={28} strokeWidth={1.75} /> */}
      </div>
    </>
  );
};

export default NavbarMobile;
