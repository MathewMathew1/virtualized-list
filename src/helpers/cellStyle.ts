import { VirtualizedTableCellStyle } from "../types/VirtualizedTableTypes";

const styleCache = new Map<string, VirtualizedTableCellStyle>();

export function getCellStyle({
  row,
  col,
  rowHeights,
  columnWidths,
}: {
  row: number;
  col: number;
  rowHeights: number[] | number | ((index: number) => number);
  columnWidths: number[] | number | ((index: number) => number);
}): VirtualizedTableCellStyle {
  const getSize = (index: number, sizes: number[] | number | ((i: number) => number)) => {
    if (typeof sizes === "function") return sizes(index);
    if (Array.isArray(sizes)) return sizes[index];
    return sizes;
  };

  const getOffset = (
    index: number,
    sizes: number[] | number | ((i: number) => number)
  ) => {
    if (typeof sizes === "function") {
      let sum = 0;
      for (let i = 0; i < index; i++) {
        sum += sizes(i);
      }
      return sum;
    } else if (Array.isArray(sizes)) {
      return sizes.slice(0, index).reduce((sum, s) => sum + s, 0);
    } else {
      return index * sizes;
    }
  };

  const top = getOffset(row, rowHeights);
  const left = getOffset(col, columnWidths);
  const height = getSize(row, rowHeights);
  const width = getSize(col, columnWidths);

  const style: VirtualizedTableCellStyle = {
    position: "absolute",
    top,
    left,
    height,
    width,
  };

  return style
}

