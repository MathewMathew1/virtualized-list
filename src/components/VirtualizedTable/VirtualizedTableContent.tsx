import { getCellStyle } from "../../helpers/cellStyle";
import type {
  VirtualizedTableContentProps,
} from "../../types/VirtualizedTableTypes";

const VirtualizedTableContent = <T, K>({
  rowHeights,
  columnWidths,
  visibleRows,
  visibleColumns,
  CellComponent,
  innerStyle,
  additionalData,
}: VirtualizedTableContentProps<T>) => {

  const cells = [];

  for (let row = visibleRows.firstVisible; row <= visibleRows.lastVisible; row++) {
    for (let col = visibleColumns.firstVisible; col <= visibleColumns.lastVisible; col++) {
      const style = getCellStyle({ row, col, rowHeights, columnWidths });
  
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
