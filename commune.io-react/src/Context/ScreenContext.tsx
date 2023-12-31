// ScreenSizeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ScreenSizeContext = createContext<any>("");

export const ScreenSizeProvider = ({ children }: any) => {
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width < 768;
  const isLargeScreen = width >= 1024;
  const isExtraLargeScreen = width >= 1280;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider
      value={{ isMobile, isLargeScreen, width, isExtraLargeScreen }}
    >
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = () => useContext(ScreenSizeContext);
