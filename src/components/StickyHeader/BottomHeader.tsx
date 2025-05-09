import { getHeaderStyle } from "../../helpers/headerStyle";
import type {
  HeaderPosition,
  VirtualizedTableHeader,
} from "../../types/VirtualizedTableTypes";

interface BottomHeaderSectionProps {
  header: VirtualizedTableHeader;
  columnWidths: number | number[];
  rowHeights: number | number[];
  visibleColumns: { firstVisible: number; lastVisible: number };
  scrollLeft: number;
  leftOffset: number;
  headers: Partial<Record<HeaderPosition, VirtualizedTableHeader>>;
  height: number;
  scrollbarSize: {
    height: number;
    width: number;
  };
}

export const BottomHeaderSection = ({
  header,
  columnWidths,
  rowHeights,
  visibleColumns,
  scrollLeft,
  headers,
  height,
  scrollbarSize,
}: BottomHeaderSectionProps) => {
  const { size } = header;

  return (
    <>
      {header.type === "cell" ? (
        <div
          style={{
            position: "absolute",
            top: height - size - scrollbarSize.height,
            zIndex: 10,
            background: "white",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ position: "relative", marginLeft: headers.left?.size }}>
            {Array.from(
              {
                length:
                  visibleColumns.lastVisible - visibleColumns.firstVisible + 1,
              },
              (_, colIdx) => {
                const columnIndex = visibleColumns.firstVisible + colIdx;
                const style = getHeaderStyle({
                  indexPosition: columnIndex,
                  direction: "bottom",
                  rowHeights,
                  columnWidths,
                  size,
                });
                style.left -= scrollLeft;

                return (
                  <header.component
                    key={`bottom-${columnIndex}`}
                    columnIndex={columnIndex}
                    style={style}
                  />
                );
              }
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            height: header.size,
            position: "absolute",
            top: height - size - scrollbarSize.height,
            left: 0,
            right: 0,
          }}
        >
          <header.component
            position={{ left: scrollLeft, top: 0 }}
            visibleRows={{ firstVisible: 0, lastVisible: 0 }} // optional, no rows for top
            visibleColumns={visibleColumns}
          />
        </div>
      )}
    </>
  );
};
