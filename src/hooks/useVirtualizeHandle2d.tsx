import { useImperativeHandle } from "react";
import { VirtualizedTableRef } from "../types/VirtualizedTableTypes";
import { getOffset, getSize } from "../helpers/size";

export function useVirtualizedHandle2D(
  ref: React.Ref<VirtualizedTableRef>,
  params: {
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
    rowHeights: number | number[] | ((index: number) => number);
    columnWidths: number | number[] | ((index: number) => number);
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

      const container = params.scrollContainerRef.current;
      if (!container) return;

      const rowOffset = getOffset(params.rowHeights, row);
      const rowSize = getSize(params.rowHeights, row);
      const viewHeight = container.clientHeight;

      let finalTop = rowOffset;
      if (alignY === "center") {
        finalTop -= viewHeight / 2 - rowSize / 2;
      } else if (alignY === "end") {
        finalTop -= viewHeight - rowSize;
      }
      finalTop += offsetY;

      const colOffset = getOffset(params.columnWidths, col);
      const colSize = getSize(params.columnWidths, col);
      const viewWidth = container.clientWidth;

      let finalLeft = colOffset;
      if (alignX === "center") {
        finalLeft -= viewWidth / 2 - colSize / 2;
      } else if (alignX === "end") {
        finalLeft -= viewWidth - colSize;
      }
      finalLeft += offsetX;

      container.scrollTo({ top: finalTop, left: finalLeft });
    },

    getScrollOffset: params.getScrollOffset,
  }));
}

