import { VirtualizedTableCellStyle } from "../types/VirtualizedTableTypes";

export function getCellStyle({
  row,
  col,
  rowHeights,
  columnWidths,
}: {
  row: number;
  col: number;
  rowHeights: number[] | number;
  columnWidths: number[] | number;
}): VirtualizedTableCellStyle {
  const getOffset = (index: number, sizes: number[] | number) => {
    if (Array.isArray(sizes)) {
      return sizes.slice(0, index).reduce((sum, s) => sum + s, 0);
    }
    return index * sizes;
  };

  const top = getOffset(row, rowHeights);
  const left = getOffset(col, columnWidths);
  const height = Array.isArray(rowHeights) ? rowHeights[row] : rowHeights;
  const width = Array.isArray(columnWidths) ? columnWidths[col] : columnWidths;

  return {
    position: "absolute",
    top,
    left,
    height,
    width,
  };
}
