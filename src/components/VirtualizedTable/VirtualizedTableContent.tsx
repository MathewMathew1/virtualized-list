import { getCellStyle } from "../../helpers/cellStyle";
import type { VirtualizedTableContentProps } from "../../types/VirtualizedTableTypes";

const VirtualizedTableContent = ({
  rowHeights,
  columnWidths,
  visibleRows,
  visibleColumns,
  CellComponent,
  innerStyle,

}: VirtualizedTableContentProps) => {
 
  return (
    <>
  
      <div style={innerStyle}>
        {Array.from(
          { length: visibleRows.lastVisible - visibleRows.firstVisible  },
          (_, rowIdx) => {
            const row = visibleRows.firstVisible + rowIdx;

            return Array.from(
              {
                length:
                  visibleColumns.lastVisible - visibleColumns.firstVisible ,
              },
              (_, colIdx) => {
                const col = visibleColumns.firstVisible + colIdx;
                const style = getCellStyle({
                  row,
                  col,
                  rowHeights,
                  columnWidths,
                });

                return (
                  <CellComponent
                    key={`${row}-${col}`}
                    rowIndex={row}
                    columnIndex={col}
                    style={style}
                  />
                );
              }
            );
          }
        )}
      </div>
    </>
  );
};

export default VirtualizedTableContent;
