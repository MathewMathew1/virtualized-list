import { useRef, useState } from "react";
import { Direction } from "../types/VirtualizedListTypes";
import { MINIMUM_DELAY_FOR_SCROLL_OFFSET } from "../constants/scroll";

export const useScrollOffset = (
  onScrollOffsetChange?: (offset: number) => void,
) => {
  const [offset, setOffset] = useState(0);

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement>,
    direction: Direction,
  ) => {
    const scrollValue =
      direction === "horizontal"
        ? e.currentTarget.scrollLeft
        : e.currentTarget.scrollTop;

    setOffset(scrollValue);
  };

  return { scrollOffset: offset, handleScroll };
};
