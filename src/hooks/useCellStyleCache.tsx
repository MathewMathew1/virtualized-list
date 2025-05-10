import { useRef, useEffect } from "react";
import { VirtualizedTableCellStyle } from "../types/VirtualizedTableTypes";
import { getSize } from "../helpers/size";

export function useCellStyleCache(
  rowOffsets: number[],
  colOffsets: number[],
  rowHeights: number[] | number | ((index: number) => number),
  columnWidths: number[] | number | ((index: number) => number)
) {
  const cacheRef = useRef(new Map<string, VirtualizedTableCellStyle>());

  useEffect(() => {
    cacheRef.current.clear();
  }, [rowOffsets, colOffsets]);

  const getCachedCellStyle = ({
    row,
    col,
  }: {
    row: number;
    col: number;
  }): VirtualizedTableCellStyle => {
    const key = `${row}-${col}`;
    const cached = cacheRef.current.get(key);
    if (cached) return cached;

    const top = typeof rowHeights === "number"? row * rowHeights : rowOffsets[row] 
    const left = typeof columnWidths === "number"? col * columnWidths:  colOffsets[col] 
   
    const height = getSize(rowHeights, row);
    const width = getSize(columnWidths, col);

    const style: VirtualizedTableCellStyle = {
      position: "absolute",
      top,
      left,
      height,
      width,
    };

    cacheRef.current.set(key, style);
    return style;
  };

  return getCachedCellStyle;
}
