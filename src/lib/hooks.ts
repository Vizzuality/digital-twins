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

export const useContainerWidthWithResize = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [containerWidth, setContainerWidth] = useState(0);
  // Set initial width on mount. Window is not available on server side.
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef]);

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [containerRef]);

  return containerWidth;
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  useEffect(() => {
    setIsMobile(!isDesktopOrLaptop);
  }, [isDesktopOrLaptop]);

  return isMobile;
};
