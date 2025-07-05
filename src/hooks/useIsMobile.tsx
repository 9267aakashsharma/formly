import { useState, useEffect, useTransition, useCallback } from "react";

const useMobileView = (breakpoint = 768, throttleTime = 200) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleResize = useCallback(() => {
    startTransition(() => {
      setIsMobile(window.innerWidth < breakpoint);
    });
  }, [breakpoint, startTransition]);

  useEffect(() => {
    handleResize();

    let timeoutId: NodeJS.Timeout | null = null;
    const throttledHandleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        handleResize();
        timeoutId = null;
      }, throttleTime);
    };

    window.addEventListener("resize", throttledHandleResize);

    return () => {
      window.removeEventListener("resize", throttledHandleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleResize, throttleTime]);

  return { isMobile, isPending };
};

export default useMobileView;
