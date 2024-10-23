import { useState, useCallback, useEffect } from "react";

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
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = useCallback(() => {
    // Use desktop breakpoint to allow for big screen mobiles
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
