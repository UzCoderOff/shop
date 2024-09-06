import { useEffect, useState } from "react";
import { Button } from "primereact/button";

const products = [
  {
    title: "iPhone 15 Series",
    promo: "Up to 10% off Voucher",
    imageUrl:
      'https://www.apple.com/v/home/bq/images/heroes/iphone-family/hero_iphone_family_a__c7v3mvx3jv42_largetall.jpg',
    brand: "https://img.icons8.com/?size=100&id=30840&format=png&color=FFFFFF",
  },
  {
    title: "Samsung Galaxy S24",
    promo: "Exclusive Offer: 15% Off",
    imageUrl:
      "https://images.samsung.com/in/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-camera-overview-mo.jpg?imbypass=true",
    brand: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  },
  {
    title: "Canon EOS R5 Camera",
    promo: "Special Offer: 10% Off + Free Shipping",
    imageUrl: "https://www.premiumbeat.com/blog/wp-content/uploads/2020/05/canon-r5-as-video-camera-cover.jpg",
    brand: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Canon_wordmark.svg",
  },
  {
    title: "MacBook Pro",
    promo: "Get Free AppleCare+",
    imageUrl:
      'https://www.lydogbillede.dk/wp-content/uploads/2023/11/hero_intro_endframe__e6khcva4hkeq_large.jpg',
    brand: "https://img.icons8.com/?size=100&id=30840&format=png&color=FFFFFF",
  },
  {
    title: "Apple Watch Series 9",
    promo: "Get 2-Year Warranty Free",
    imageUrl:
      "https://www.apple.com/v/apple-watch-series-9/d/images/meta/watch_series_9_gps_lte__eopecolsebyq_og.png",
    brand: "https://img.icons8.com/?size=100&id=30840&format=png&color=FFFFFF",
  },
];

const Carousel = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentProductIndex(index);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden bg-black">
      <div className="relative w-full pb-[66.66%] md:pb-[50%] lg:pb-[40%]"> 
        {products.map((product, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentProductIndex ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="absolute w-full h-full object-cover object-center z-0"  
              style={{ backgroundColor: "#000" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-center items-start p-4 md:p-8">
              <img
                src={product.brand}
                alt="Brand Logo"
                className="w-8 h-8 mb-2 md:w-10 md:h-10 md:mb-4"
              />
              <p className="text-white text-lg mb-1 md:text-xl md:mb-2">
                {product.title}
              </p>
              <h2 className="text-white text-2xl font-bold mb-2 md:text-4xl md:mb-4">
                {product.promo}
              </h2>
              <Button className="bg-white text-black hover:bg-gray-200 px-3 py-1 md:px-4 md:py-2 font-semibold">
                Shop Now <span className="ml-2">→</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
        {products.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentProductIndex ? "bg-white scale-125" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
