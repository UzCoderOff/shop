import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Search = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (e) => {
    setSelectedItem(e.value);
  };

  return (
    <div className="bg-[#f5f5f5] p-2 flex flex-row align-middle justify-start px-3 pl-5 gap-8 py-2 w-full">
      <button>
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
      </button>
      <div>
        <AutoComplete
          className="w-[100%] mr-4"
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
  );
};

export default Search;
