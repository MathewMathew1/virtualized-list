import { useEffect, useMemo } from "react";
import { useCellStyleCache } from "../../hooks/useCellStyleCache";
import type { VirtualizedTableContentProps } from "../../types/VirtualizedTableTypes";

const VirtualizedTableContent = <T, K>({
  rowHeights,
  columnWidths,
  visibleRows,
  visibleColumns,
  CellComponent,
  additionalData,
  rowsOffsets,
  columnsOffsets,
  offsetVersion,
}: VirtualizedTableContentProps<T>) => {
  const { getCachedCellStyle, clearCache } = useCellStyleCache(
    rowsOffsets,
    columnsOffsets,
    rowHeights,
    columnWidths
  );

  useEffect(() => {
    clearCache();
  }, [offsetVersion]);

  const cells = useMemo(() => {
    const tempCells = [];

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
        const style = getCachedCellStyle({ row, col });

        tempCells.push(
          <CellComponent
            key={`${row}-${col}`}
            rowIndex={row}
            columnIndex={col}
            style={style}
            additionalData={
              additionalData as T extends undefined ? undefined : T
            }
          />
        );
      }
    }

    return tempCells;
  }, [visibleRows, visibleColumns, getCachedCellStyle, additionalData]);

  return <div style={{ position: "relative" }}>{cells}</div>;
};

export default VirtualizedTableContent;
