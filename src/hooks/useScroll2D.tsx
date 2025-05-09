import { useState, useRef } from "react";
import { MINIMUM_DELAY_FOR_SCROLL_OFFSET } from "../constants/scroll";

export function useScrollOffset2D(
  onScroll?: (offsetTop: number, offsetLeft: number) => void
) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const lastUpdateRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingTop = useRef<number | null>(null);
  const pendingLeft = useRef<number | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const now = Date.now();
    const target = e.currentTarget;
    const newTop = target.scrollTop;
    const newLeft = target.scrollLeft;

    const timeSinceLast = now - lastUpdateRef.current;

    const applyUpdate = (top: number, left: number) => {
      lastUpdateRef.current = Date.now();
      setScrollTop(top);
      setScrollLeft(left);
      onScroll?.(top, left);
    };

    if (timeSinceLast >= MINIMUM_DELAY_FOR_SCROLL_OFFSET) {
      applyUpdate(newTop, newLeft);
    } else {
      pendingTop.current = newTop;
      pendingLeft.current = newLeft;

      if (!timeoutRef.current) {
        const delay = MINIMUM_DELAY_FOR_SCROLL_OFFSET - timeSinceLast;
        timeoutRef.current = setTimeout(() => {
          if (pendingTop.current !== null && pendingLeft.current !== null) {
            applyUpdate(pendingTop.current, pendingLeft.current);
            pendingTop.current = null;
            pendingLeft.current = null;
          }
          timeoutRef.current = null;
        }, delay);
      }
    }
  };

  return { scrollTop, scrollLeft, handleScroll };
}

