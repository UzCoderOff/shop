import { SendHorizontal } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <div>
          <h3 className="font-bold mb-4">Exclusive</h3>
          <p className="mb-2">Subscribe</p>
          <p className="mb-4">Get 10% off your first order</p>
          <div className="flex items-center border border-white rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black p-2 text-white focus:outline-none w-full"
            />
            <button className=" px-4 py-2">
              <SendHorizontal />
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh</p>
          <p className="mt-2">exclusive@gmail.com</p>
          <p className="mt-2">+88015-88888-9999</p>
        </div>

        <div>
          <h3 className="font-bold mb-4">Account</h3>
          <ul className="space-y-2">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Quick Link</h3>
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Download App</h3>
          <p className="mb-4">Save $3 with App New User Only</p>
          <div className="flex space-x-4 mb-4 items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Rickrolling_QR_code.png"
              alt="QR Code"
              className="w-20 h-20"
            />
            <div className="flex flex-col">
              <a href="https://play.google.com/store/" target="_blank">
                <img
                  src="https://www.jcml-tx.org/ebook/get-it-on-google-play-badge.png/@@images/image.png"
                  alt="Google Play"
                  className="w-24 h-8 mb-2"
                />
              </a>
              <a href="https://apps.apple.com/" target="_blank">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/91/Download_on_the_App_Store_RGB_blk.svg"
                  alt="App Store"
                  className="w-24 h-8"
                />
              </a>
            </div>
          </div>
          <div className="flex space-x-4">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>© Copyright Rimel 2022. All rights reserved</p>
      </div>
      <div className="960:hidden block">
        <br/>
        <br/>
      </div>
    </footer>
  );
};

export default Footer;
