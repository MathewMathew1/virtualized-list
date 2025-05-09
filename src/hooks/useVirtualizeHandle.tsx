import { useImperativeHandle } from "react";
import { VirtualizedListRef } from "../types/VirtualizedListTypes";

export type Options = {offset: number, align: "start"|"center"|"end"}

export function useVirtualizedHandle(
  ref: React.Ref<VirtualizedListRef>,
  params: {
    direction: "horizontal" | "vertical";
    itemSize: number | number[];
    scrollContainerRef: React.RefObject<HTMLDivElement|null>;
    getScrollOffset: () => number;
  }
) {
  useImperativeHandle(ref, () => ({
    scrollToIndex: (index, options: Options = {offset: 0, align: "start"}) => {
      const { offset = 0, align = "start" } = options;
      const { direction, itemSize, scrollContainerRef } = params;

      if (!scrollContainerRef.current) return;

      const baseOffset = Array.isArray(itemSize)
        ? itemSize.slice(0, index).reduce((a, b) => a + b, 0)
        : index * itemSize;

      const itemLength = Array.isArray(itemSize)
        ? itemSize[index]
        : itemSize;

      const viewSize =
        direction === "horizontal"
          ? scrollContainerRef.current.clientWidth
          : scrollContainerRef.current.clientHeight;

      let finalOffset = baseOffset;

      if (align === "center") {
        finalOffset = baseOffset - viewSize / 2 + itemLength / 2;
      } else if (align === "end") {
        finalOffset = baseOffset - viewSize + itemLength;
      }

      finalOffset += offset;

      if (direction === "horizontal") {
        scrollContainerRef.current.scrollLeft = finalOffset;
      } else {
        scrollContainerRef.current.scrollTop = finalOffset;
      }
    },

    getScrollOffset: params.getScrollOffset,
  }));
}
