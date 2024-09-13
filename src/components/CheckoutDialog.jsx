import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const CheckoutDialog = ({ visible, onHide, cartItems, updateCart }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const toast = React.useRef(null);

  useEffect(() => {
    const savedInfo = JSON.parse(localStorage.getItem("checkoutInfo"));
    if (savedInfo) {
      setName(savedInfo.name || "");
      setAddress(savedInfo.address || "");
      setPhoneNumber(savedInfo.phoneNumber || "");
    }
  }, [visible]);

  const handleCheckout = () => {
    if (name && address && phoneNumber) {
      localStorage.setItem(
        "checkoutInfo",
        JSON.stringify({ name, address, phoneNumber })
      );

      updateCart([]);

      toast.current.show({
        severity: "success",
        summary: "Checkout Successful",
        detail: "Your order has been placed!",
      });

      onHide();
    } else {
      setError("Please fill all fields.");
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        onHide={onHide}
        header="Checkout"
        className="w-full md:w-2/3 lg:w-1/3 p-4 bg-white"
        style={{ borderRadius: "12px" }}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={onHide}
              className="p-button-text p-button-danger bg-[red] text-white py-1 px-4"
            />
            <Button
              label="Checkout"
              icon="pi pi-check"
              className="p-button-success bg-[green] text-white py-1 px-4"
              onClick={handleCheckout}
            />
          </div>
        }
      >
        <div className="p-fluid space-y-6">
          <div className="field">
            <label htmlFor="name" className="font-semibold text-lg">
              Name
            </label>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-inputtext-lg rounded-md"
              style={{
                padding: "12px",
                border: "2px solid #e0e0e0",
              }}
            />
          </div>
          <div className="field">
            <label htmlFor="address" className="font-semibold text-lg">
              Address
            </label>
            <InputText
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full p-inputtext-lg rounded-md"
              style={{
                padding: "12px",
                border: "2px solid #e0e0e0",
              }}
            />
          </div>
          <div className="field">
            <label htmlFor="phone" className="font-semibold text-lg">
              Phone Number
            </label>
            <InputText
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-inputtext-lg rounded-md"
              style={{
                padding: "12px",
                border: "2px solid #e0e0e0",
              }}
            />
          </div>
          {error && <p className="text-red-500 font-semibold">{error}</p>}
        </div>
      </Dialog>
    </div>
  );
};

export default CheckoutDialog;
