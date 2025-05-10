import { getCellStyle } from "../../helpers/cellStyle";
import { useCellStyleCache } from "../../hooks/useCellStyleCache";
import type { VirtualizedTableContentProps } from "../../types/VirtualizedTableTypes";

const VirtualizedTableContent = <T, K>({
  rowHeights,
  columnWidths,
  visibleRows,
  visibleColumns,
  CellComponent,
  innerStyle,
  additionalData,
  rowsOffsets,
  columnsOffsets,
}: VirtualizedTableContentProps<T>) => {

  const getCachedCellStyle = useCellStyleCache(rowsOffsets, columnsOffsets, rowHeights, columnWidths);

  const cells = [];

  for (
    let row = visibleRows.firstVisible;
    row <= visibleRows.lastVisible;
    row++
  ) {
    for (
      let col = visibleColumns.firstVisible;
      col <= visibleColumns.lastVisible;
      col++
    ) {
      const style = getCachedCellStyle({row, col})

      cells.push(
        <CellComponent
          key={`${row}-${col}`}
          rowIndex={row}
          columnIndex={col}
          style={style}
          additionalData={additionalData as T extends undefined ? undefined : T}
        />
      );
    }
  }

  return <div style={innerStyle}>{cells}</div>;
};

export default VirtualizedTableContent;
