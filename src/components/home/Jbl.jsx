import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Jbl = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const nav = useNavigate()

  useEffect(() => {
    const targetDate = new Date('October 5, 2024 00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(interval);
        setTimeLeft({});
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black text-white p-6 md:p-12" >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center">
        <div className="space-y-4">
          <p className="text-green-400 text-lg font-semibold">Categories</p>
          <h1 className="text-3xl md:text-5xl font-bold">
            Enhance Your Music Experience
          </h1>
          {timeLeft.days !== undefined ? (
            <div className="flex space-x-4 text-center">
              <div>
                <p className="text-4xl font-bold">{timeLeft.days}</p>
                <p className="text-sm">Days</p>
              </div>
              <div>
                <p className="text-4xl font-bold">{timeLeft.hours}</p>
                <p className="text-sm">Hours</p>
              </div>
              <div>
                <p className="text-4xl font-bold">{timeLeft.minutes}</p>
                <p className="text-sm">Minutes</p>
              </div>
              <div>
                <p className="text-4xl font-bold">{timeLeft.seconds}</p>
                <p className="text-sm">Seconds</p>
              </div>
            </div>
          ) : (
            <p className="text-xl font-bold">Offer has ended!</p>
          )}
          <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-full mt-4" onClick={()=> nav('/product/6bdc8c31-2638-4490-9253-3441eff2bbc8')}>
            Buy Now!
          </button>
        </div>

        <div className="mt-8 md:mt-0 flex justify-center items-center">
          <img
            src='https://www.apple.com/v/airpods-max/f/images/overview/hero__gnfk5g59t0qe_xlarge.png'
            alt="JBL Boombox"
            className="w-full h-auto md:w-[90%] lg:w-[85%] xl:w-[80%] object-cover"
            style={{ padding: 0, margin: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Jbl;
