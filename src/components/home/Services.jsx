import { Headset, ShieldCheck, Truck } from "lucide-react";
import React from "react";

const Services = () => {
  const services = [
    {
      icon: <Truck />, 
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: <Headset />,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: <ShieldCheck />, 
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-around items-center py-8 bg-white space-y-6 md:space-y-0 md:space-x-6">
      {services.map((service, index) => (
        <div key={index} className="text-center max-w-xs">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gray-200 p-4 rounded-full">
              <span className="text-4xl">{service.icon}</span>
            </div>
          </div>
          <h3 className="font-bold text-lg">{service.title}</h3>
          <p className="text-gray-500">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
