import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { BreadCrumb } from "primereact/breadcrumb";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Heart, Minus, Plus } from "lucide-react";
import ProductCard from "./ProductCard";
import Error404 from "./Error404";
import { ProgressSpinner } from "primereact/progressspinner";
import CheckoutDialog from './CheckoutDialog'

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [fav, setFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("id", "==", productId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const productData = querySnapshot.docs[0].data();
        setProduct(productData);
        setSelectedImg(productData.images[0]);

        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setFav(wishlist.some((item) => item.id === productData.id));

        fetchRelatedProducts(productData.category, productId);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (category, currentProductId) => {
    try {
      const relatedProductsRef = collection(db, "products");
      const q = query(relatedProductsRef, where("category", "==", category));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs
        .map((doc) => doc.data())
        .filter((prod) => prod.id !== currentProductId);
      setRelatedProducts(products);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (fav) {
      const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    setFav(!fav);
  };

  const handleCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.value);
  };

  const items = [
    { label: "Home", url: "/" },
    { label: product?.category, url: `/category/${product?.category}` },
    { label: product?.name },
  ];

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-[100vh] bg-[rgba(0,0,0,0.6)] z-50 flex justify-center items-center">
        <ProgressSpinner />
      </div>
    );
  }

  if (!product) {
    return <Error404 />;
  }

  const stock = product?.stock || 0;

  if (!product) {
    return <Error404 />;
  }

  return (
    <div className="relative pt-24 w-full lg:px-[9.3%] px-4">
      <BreadCrumb
        model={items}
        className="absolute lg:top-4 top-2 lg:left-[8.3%] left-4 mb-8 text-sm"
      />
      <div className="flex flex-col lg:flex-row align-middle justify-center gap-10">
        <div className="flex flex-row lg:w-1/2 gap-4">
          <div className="hide_scrollbar flex flex-col gap-4 overflow-y-scroll max-h-[400px] lg:max-h-[600px]">
            {product?.images?.map((im, idx) => (
              <img
                src={im}
                key={idx}
                onClick={() => setSelectedImg(im)}
                alt={`Product Thumbnail ${idx}`}
                className={`object-cover cursor-pointer transition-transform duration-200 border ${
                  selectedImg === im ? "border-blue-500" : "border-transparent"
                } rounded-md hover:scale-105`}
                style={{ width: "60px", height: "60px" }}
              />
            ))}
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src={selectedImg}
              alt="Selected Product"
              className="object-cover rounded-lg shadow-lg"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "100%",
                maxHeight: "500px",
              }}
            />
          </div>
        </div>
        <div className="lg:w-1/2 flex flex-col gap-4 p-4 text-wrap">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">
            {product?.name}
          </h1>
          <div className="flex flex-row items-center justify-start gap-1">
            <img
              src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000"
              width={20}
              alt="Rating"
            />
            <h1 className="text-sm lg:text-base">
              {product?.rating} ({product?.reviewsCount} reviews)
            </h1>
          </div>
          <h1 className="text-2xl lg:text-3xl">${product?.price}</h1>
          <h1 className="text-sm lg:text-base">{product?.description}</h1>
          <div className="border-t-2 mt-3 pt-3">
            <div className="flex sm:flex-row flex-col items-start justify-start gap-2 mt-4">
              <div>
                <InputNumber
                  showButtons
                  buttonLayout="horizontal"
                  value={quantity}
                  onValueChange={handleQuantityChange}
                  step={1}
                  incrementButtonIcon={<Plus />}
                  decrementButtonIcon={<Minus />}
                  min={0}
                  max={stock}
                  inputClassName="text-center"
                  className="border-2 h-10 rounded-md border-black"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {stock} items in stock
                </p>
              </div>
              <div className="flex flex-row align-middle gap-2">
                <Button
                  label="Buy Now"
                  className="bg-primary text-white py-2 px-5 lg:px-7 rounded-md"
                  onClick={() => setCheckoutVisible(true)}
                />
                <CheckoutDialog
                  visible={checkoutVisible}
                  onHide={() => setCheckoutVisible(false)}
                  cartItems={cartItems}
                  updateCart={(newCart) => setCartItems(newCart)}
                />
                <Button
                  icon={
                    <Heart
                      fill={fav ? "red" : "white"}
                      stroke={fav ? "red" : "black"}
                    />
                  }
                  className="rounded-md border-2 p-2"
                  onClick={handleWishlist}
                />
              </div>
            </div>
            <div className="py-3">
              <Button
                className="border-2 p-2 shadow-md rounded-lg font-sans font-semibold hover:shadow-xl"
                onClick={handleCart}
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5">
        <h1 className="category-title">Related Items</h1>
        <div className="grid xl:grid-cols-4 pt-10 810:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 justify-between">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct, index) => (
              <ProductCard key={index} product={relatedProduct} />
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
