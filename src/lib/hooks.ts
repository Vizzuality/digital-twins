import { useState, useCallback, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const useScreenWidthWithResize = () => {
  const [width, setWidth] = useState(0);
  // Set initial width on mount. Window is not available on server side.
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export const useIsMobile = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  return !isDesktopOrLaptop;
};
