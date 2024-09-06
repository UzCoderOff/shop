import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { BreadCrumb } from "primereact/breadcrumb";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Heart, Minus, Plus, RefreshCw, Truck } from "lucide-react";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const toast = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error("Product ID is undefined!");
        return;
      }
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("id", "==", productId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const productData = querySnapshot.docs[0].data();
          console.log("Product Data:", productData);
          setProduct(productData);
          setSelectedImg(productData.images[0]);
        } else {
          console.log("No such product found!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = e.value === null ? 0 : e.value;
    if (value <= product?.stock) {
      setQuantity(value);
    }
  };

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Purchase completed!",
      life: 3000,
    });

    setCheckoutVisible(false);
  };

  const stock = product?.stock;

  return (
    <div className="relative pt-24 w-full lg:px-[9.3%] px-4">
      <Toast ref={toast} />
      <BreadCrumb
        model={[]}
        className="absolute lg:top-4 top-2 lg:left-[8.3%] left-4 mb-8 text-sm"
      />
      <div className="flex flex-col lg:flex-row align-middle justify-center gap-10">
        <div className="flex flex-row lg:w-1/2 gap-4">
          <div className="flex flex-col gap-4 overflow-y-scroll max-h-[400px] lg:max-h-[600px]">
            {product?.images?.map((im, idx) => (
              <img
                src={im}
                key={idx}
                onClick={() => setSelectedImg(im)}
                alt={`Product Thumbnail ${idx}`}
                className={`cursor-pointer transition-transform duration-200 border ${
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
                <Button
                  icon={<Heart />}
                  className="rounded-md border-2 p-2"
                  onClick={() => console.log("Added to wishlist")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        visible={checkoutVisible}
        style={{ width: "50vw" }}
        header="Checkout"
        modal
        onHide={() => setCheckoutVisible(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full"
            />
          </div>
          <div className="p-field">
            <label htmlFor="address">Address</label>
            <InputText
              id="address"
              name="address"
              value={userInfo.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              className="w-full"
            />
          </div>
          <div className="p-field">
            <label htmlFor="phone">Phone</label>
            <InputText
            type="number"
              id="phone"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full"
            />
          </div>
          <div className="flex justify-end">
            <Button label="Buy" onClick={handleCheckout} className="bg-primary p-2 text-white" />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Product;
