import { useEffect, useState, useRef } from "react";

interface UseScrollTrackerOptions {
  ref?: React.RefObject<HTMLElement>; // optional scroll container
  threshold?: number; // px threshold for top/bottom detection
  onReachTop?: () => void;
  onReachBottom?: () => void;
}

export const useScrollTracker = ({
  ref,
  threshold = 50,
  onReachTop,
  onReachBottom,
}: UseScrollTrackerOptions = {}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const triggeredTop = useRef(false);
  const triggeredBottom = useRef(false);

  useEffect(() => {
    const element = ref?.current || document.documentElement;

    const handleScroll = () => {
      const scrollTop = element.scrollTop || window.scrollY;
      const scrollHeight = element.scrollHeight || document.body.scrollHeight;
      const clientHeight = element.clientHeight || window.innerHeight;

      setScrollY(scrollTop);

      // Top detection
      if (scrollTop <= threshold) {
        setIsAtTop(true);
        if (!triggeredTop.current && onReachTop) {
          onReachTop();
          triggeredTop.current = true;
        }
      } else {
        setIsAtTop(false);
        triggeredTop.current = false;
      }

      // Bottom detection
      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        setIsAtBottom(true);
        if (!triggeredBottom.current && onReachBottom) {
          onReachBottom();
          triggeredBottom.current = true;
        }
      } else {
        setIsAtBottom(false);
        triggeredBottom.current = false;
      }
    };

    // Attach listener
    const target = ref?.current || window;
    target.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, [ref, threshold, onReachTop, onReachBottom]);

  return { scrollY, isAtTop, isAtBottom };
};
