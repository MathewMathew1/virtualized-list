import { getCellStyle } from "../../helpers/cellStyle";
import type {
  VirtualizedTableCellStyle,
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
  return (
    <>
      <div style={innerStyle}>
        {Array.from(
          { length: visibleRows.lastVisible - visibleRows.firstVisible },
          (_, rowIdx) => {
            const row = visibleRows.firstVisible + rowIdx;

            return Array.from(
              {
                length:
                  visibleColumns.lastVisible - visibleColumns.firstVisible,
              },
              (_, colIdx) => {
                const col = visibleColumns.firstVisible + colIdx;
                const style = getCellStyle({
                  row,
                  col,
                  rowHeights,
                  columnWidths,
                });

                return renderItem(CellComponent, {
                  key: `${row}-${col}`,
                  columnIndex: col,
                  rowIndex: row,
                  style: style,
                  additionalData,
                });
              }
            );
          }
        )}
      </div>
    </>
  );
};

function renderItem<K>(
  Component: React.ComponentType<any>,
  props: {
    columnIndex: number;
    style: VirtualizedTableCellStyle;
    additionalData?: K;
    key: string;
    rowIndex: number;
  }
) {
  const { key, additionalData, ...rest } = props;
  console.log(additionalData);
  return additionalData !== undefined ? (
    <Component key={key} {...rest} additionalData={additionalData} />
  ) : (
    <Component key={key} {...rest} />
  );
}

export default VirtualizedTableContent;
