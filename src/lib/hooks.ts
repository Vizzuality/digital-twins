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
  }, [containerRef, handleResize]);

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

/**
 * Custom hook to detect if the device is an iPad
 * @returns {boolean} True if the device is detected as an iPad
 */
export function useIsIpad(): boolean {
  const [isIpad, setIsIpad] = useState(false);

  useEffect(() => {
    const checkIsIpad = () => {
      const isIOS =
        /iPad|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      const isTablet = isIOS && window.innerWidth > 767;

      setIsIpad(isTablet);
    };

    checkIsIpad();

    // Also check on resize in case of orientation changes
    window.addEventListener("resize", checkIsIpad);
    return () => window.removeEventListener("resize", checkIsIpad);
  }, []);

  return isIpad;
}
