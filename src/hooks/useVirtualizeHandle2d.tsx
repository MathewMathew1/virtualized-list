import { useImperativeHandle } from "react";
import { VirtualizedTableRef } from "../types/VirtualizedTableTypes";

export function useVirtualizedHandle2D(
  ref: React.Ref<VirtualizedTableRef>,
  params: {
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
    rowHeights: number | number[];
    columnWidths: number | number[];
    getScrollOffset: () => { scrollLeft: number; scrollTop: number };
  }
) {
  useImperativeHandle(ref, () => ({
    scrollTo: (row, col, options = {}) => {
      const {
        offsetX = 0,
        offsetY = 0,
        alignX = "start",
        alignY = "start",
      } = options;

      const { scrollContainerRef, rowHeights, columnWidths } = params;
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;

      const getSize = (arr: number[] | number, index: number) =>
        Array.isArray(arr) ? arr[index] : arr;

      const getOffset = (arr: number[] | number, index: number) =>
        Array.isArray(arr)
          ? arr.slice(0, index).reduce((a, b) => a + b, 0)
          : index * arr;

    
      const rowOffset = getOffset(rowHeights, row);
      const rowSize = getSize(rowHeights, row);
      const viewHeight = container.clientHeight;

      let finalTop = rowOffset;
      if (alignY === "center") {
        finalTop = rowOffset - viewHeight / 2 + rowSize / 2;
      } else if (alignY === "end") {
        finalTop = rowOffset - viewHeight + rowSize;
      }
      finalTop += offsetY;

      const colOffset = getOffset(columnWidths, col);
      const colSize = getSize(columnWidths, col);
      const viewWidth = container.clientWidth;

      let finalLeft = colOffset;
      if (alignX === "center") {
        finalLeft = colOffset - viewWidth / 2 + colSize / 2;
      } else if (alignX === "end") {
        finalLeft = colOffset - viewWidth + colSize;
      }
      finalLeft += offsetX;

      container.scrollTo({
        left: finalLeft,
        top: finalTop,
      });
    },

    getScrollOffset: params.getScrollOffset,
  }));
}
