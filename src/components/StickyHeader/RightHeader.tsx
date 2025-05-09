import { getHeaderStyle } from "../../helpers/headerStyle";
import type {
  HeaderPosition,
  VirtualizedTableHeader,
} from "../../types/VirtualizedTableTypes";

interface RightHeaderSectionProps {
  header: VirtualizedTableHeader;
  columnWidths: number[] | number | ((index: number) => number);
  rowHeights: number[] | number | ((index: number) => number);
  visibleRows: { firstVisible: number; lastVisible: number };
  scrollTop: number;
  leftOffset: number;
  headers: Partial<Record<HeaderPosition, VirtualizedTableHeader>>;
  scrollbarSize: {
    height: number;
    width: number;
  };
  width: number;
}

export const RightHeaderSection = ({
  header,
  columnWidths,
  rowHeights,
  visibleRows,
  scrollTop,
  headers,
  scrollbarSize,
  width,
}: RightHeaderSectionProps) => {
  const { size } = header;

  return (
    <>
      {header.type == "cell" ? (
        <div
          style={{
            position: "absolute",
            left: width - size - scrollbarSize.width,
            zIndex: 10,
            background: "white",
            display: "flex",
            flexDirection: "column",

            top: 0,
          }}
        >
          <div style={{ position: "relative", marginTop: headers.top?.size }}>
            {Array.from(
              {
                length: visibleRows.lastVisible - visibleRows.firstVisible + 1,
              },
              (_, rowIdx) => {
                const rowIndex = visibleRows.firstVisible + rowIdx;
                const style = getHeaderStyle({
                  indexPosition: rowIndex,
                  direction: "right",
                  rowHeights,
                  columnWidths,
                  size,
                });

                style.top -= scrollTop;
                return (
                  <header.component
                    key={`right-${rowIndex}`}
                    columnIndex={rowIndex}
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
            width: header.size,
            position: "absolute",
            top: 0,
            left: width - size - scrollbarSize.width,
        
          }}
        >
          <header.component
            position={{ left: 0, top: scrollTop }}
            visibleRows={visibleRows}
            visibleColumns={{ firstVisible: 0, lastVisible: 0 }}
          />
        </div>
      )}
    </>
  );
};
