import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";

export function useWindowWidth() {
  const [size, setSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}

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
