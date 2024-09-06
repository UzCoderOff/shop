import React, { useState, useEffect } from "react";
import NavbarMobile from '../mobile/NavbarMobile';
import NavbarDesktop from '../desktop/NavbarDesktop';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 960);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? <NavbarMobile /> : <NavbarDesktop />}
    </>
  );
};

export default Navbar;
