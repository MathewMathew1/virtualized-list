import type { VirtualizedHeaderStyle } from "../types/VirtualizedTableTypes";


export function getHeaderStyle({
  indexPosition,
  direction,
  rowHeights,
  columnWidths,
  size
}: {
  indexPosition: number;
  direction: "top" | "bottom" | "left" | "right";
  rowHeights: number[] | number;
  columnWidths: number[] | number;
  size: number
}): VirtualizedHeaderStyle  {
  const getOffset = (index: number, sizes: number[] | number) => {
    if (Array.isArray(sizes)) {
      return sizes.slice(0, index).reduce((sum, s) => sum + s, 0);
    }
    return index * sizes;
  };

  const height = Array.isArray(rowHeights)
    ? rowHeights[indexPosition]
    : rowHeights;
  const width = Array.isArray(columnWidths)
    ? columnWidths[indexPosition]
    : columnWidths;

  let top = 0;
  let left = 0;

  if (direction === "top" || direction === "bottom") {
    left = getOffset(indexPosition, columnWidths);
  } else {
    top = getOffset(indexPosition, rowHeights);
  }

  return {
    position: "absolute",
    top,
    left,
    height: direction === "top" || direction === "bottom" ? size : height,
    width: direction === "left" || direction === "right" ? size : width,
  };
}
