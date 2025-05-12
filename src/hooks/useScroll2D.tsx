import { useState, useRef, useCallback } from "react";

export function useScrollOffset2D(
  onScroll?: (offsetTop: number, offsetLeft: number) => void,
) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const lastUpdateRef = useRef(0);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;

      lastUpdateRef.current = Date.now();
      setScrollTop(target.scrollTop);
      setScrollLeft(target.scrollLeft);
      onScroll?.(target.scrollTop, target.scrollLeft);

  
    },
    [onScroll],
  );

  return { scrollTop, scrollLeft, handleScroll };
}
