import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Navbar,
  Footer,
  Error404,
  Product,
  Cart,
  WhishList,
  AllProduct,
  Category,
} from "./components";
import { ScrollTop } from "primereact/scrolltop";
import { ChevronUp } from "lucide-react";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/all" element={<AllProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/whishlist" element={<WhishList />} />
        <Route path="/category/:name" element={<Category />} />
      </Routes>
      <ScrollTop icon={<ChevronUp color="#111" />} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
