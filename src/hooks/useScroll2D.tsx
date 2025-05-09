import { useState, useRef } from "react";
import { MINIMUM_DELAY_FOR_SCROLL_OFFSET } from "../constants/scroll";

export function useScrollOffset2D(
  onScroll?: (offsetTop: number, offsetLeft: number) => void
) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const lastUpdateRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingTop = useRef<number>(0);
  const pendingLeft = useRef<number>(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const now = Date.now();
    const target = e.currentTarget;

    pendingTop.current = target.scrollTop;
    pendingLeft.current = target.scrollLeft;

    const timeSinceLast = now - lastUpdateRef.current;

    const applyUpdate = () => {
      lastUpdateRef.current = Date.now();
      setScrollTop(pendingTop.current);
      setScrollLeft(pendingLeft.current);
      onScroll?.(pendingTop.current, pendingLeft.current);
    };

    if (timeSinceLast >= MINIMUM_DELAY_FOR_SCROLL_OFFSET) {
      applyUpdate();
    } else {
      if (!timeoutRef.current) {
        const delay = MINIMUM_DELAY_FOR_SCROLL_OFFSET - timeSinceLast;
        timeoutRef.current = setTimeout(() => {
          applyUpdate();

          timeoutRef.current = null;
        }, delay);
      }
    }
  };

  return { scrollTop, scrollLeft, handleScroll };
}
