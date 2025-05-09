import { useRef, useState } from "react";
import { Direction } from "../types/VirtualizedListTypes";
import { MINIMUM_DELAY_FOR_SCROLL_OFFSET } from "../constants/scroll";

export const useScrollOffset = (onScrollOffsetChange?: (offset: number) => void) => {
  const [offset, setOffset] = useState(0);
  const lastUpdateTimeRef = useRef(0);
  const pendingValueRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>, direction: Direction) => {
    const scrollValue = direction === "horizontal"
      ? e.currentTarget.scrollLeft
      : e.currentTarget.scrollTop;

    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateTimeRef.current;

    const applyUpdate = (value: number) => {
      lastUpdateTimeRef.current = Date.now();
      setOffset(value);
      if (onScrollOffsetChange) {
        onScrollOffsetChange(value);
      }
    };

    if (timeSinceLastUpdate >= MINIMUM_DELAY_FOR_SCROLL_OFFSET) {
      applyUpdate(scrollValue);
    } else {

      pendingValueRef.current = scrollValue;
      if (!timeoutRef.current) {
        const delay = MINIMUM_DELAY_FOR_SCROLL_OFFSET - timeSinceLastUpdate;
        timeoutRef.current = setTimeout(() => {
          if (pendingValueRef.current !== null) {
            applyUpdate(pendingValueRef.current);
            pendingValueRef.current = null;
          }
          timeoutRef.current = null;
        }, delay);
      }
    }
  };

  return { scrollOffset: offset, handleScroll };
};

