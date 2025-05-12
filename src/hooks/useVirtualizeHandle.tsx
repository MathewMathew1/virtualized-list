import { useImperativeHandle } from "react";
import { VirtualizedListRef } from "../types/VirtualizedListTypes";
import { getOffset } from "../helpers/size";

export type Options = { offset: number; align: "start" | "center" | "end" };

export function useVirtualizedHandle(
  ref: React.Ref<VirtualizedListRef>,
  params: {
    direction: "horizontal" | "vertical";
    itemSize: number[] | number | ((index: number) => number);
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
    getScrollOffset: () => number;
    setSizesSinceIndex: (
      index: number,
      itemSize: number[] | ((index: number) => number)
    ) => void;
  }
) {
  useImperativeHandle(ref, () => ({
    updateSizesSinceIndex: (index: number) => {
      if (typeof params.itemSize !== "number") {
        params.setSizesSinceIndex(index, params.itemSize);
      }
    },
    scrollToIndex: (
      index,
      options: Options = { offset: 0, align: "start" }
    ) => {
      const { offset = 0, align = "start" } = options;
      const { direction, itemSize, scrollContainerRef } = params;

      if (!scrollContainerRef.current) return;

      const baseOffset = getOffset(itemSize, index);

      const viewSize =
        direction === "horizontal"
          ? scrollContainerRef.current.clientWidth
          : scrollContainerRef.current.clientHeight;

      let finalOffset = baseOffset;

      if (align === "center") {
        finalOffset = baseOffset - viewSize / 2;
      } else if (align === "end") {
        finalOffset = baseOffset - viewSize;
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
