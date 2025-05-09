import type { VirtualizedHeaderStyle } from "../types/VirtualizedTableTypes";
import { getOffset, getSize } from "./size";


export function getHeaderStyle({
  indexPosition,
  direction,
  rowHeights,
  columnWidths,
  size
}: {
  indexPosition: number;
  direction: "top" | "bottom" | "left" | "right";
  rowHeights: number[] | number | ((index: number) => number);
  columnWidths: number[] | number | ((index: number) => number);
  size: number
}): VirtualizedHeaderStyle  {

  const height = getSize(rowHeights, indexPosition) 
  const width = getSize(columnWidths, indexPosition)  

  let top = 0;
  let left = 0;

  if (direction === "top" || direction === "bottom") {
    left = getOffset(columnWidths, indexPosition);
  } else {
    top = getOffset(rowHeights, indexPosition);
  }

  return {
    position: "absolute",
    top,
    left,
    height: direction === "top" || direction === "bottom" ? size : height,
    width: direction === "left" || direction === "right" ? size : width,
  };
}
