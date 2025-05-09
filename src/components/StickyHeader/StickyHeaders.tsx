import {
  HeaderPosition,
  VirtualizedTableHeader,
} from "../../types/VirtualizedTableTypes";
import { BottomHeaderSection } from "./BottomHeader";
import { LeftHeaderSection } from "./LeftHeader";
import { RightHeaderSection } from "./RightHeader";
import { TopHeaderSection } from "./TopHeader";

interface StickyHeadersProps {
  headers?: Partial<Record<HeaderPosition, VirtualizedTableHeader>>;
  rowHeights: number[] | number | ((index: number) => number);
  columnWidths: number[] | number | ((index: number) => number);
  visibleRows: { firstVisible: number; lastVisible: number };
  visibleColumns: { firstVisible: number; lastVisible: number };
  height: number;
  width: number;
  scrollLeft: number;
  scrollTop: number;
  scrollbarSize: {
    height: number;
    width: number;
  };
}

export const StickyHeaders = ({
  headers,
  rowHeights,
  columnWidths,
  visibleRows,
  visibleColumns,
  height,
  width,
  scrollLeft,
  scrollTop,
  scrollbarSize,
}: StickyHeadersProps) => {
  if (!headers) return null;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 10,
        background: "white",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        {headers.top ? (
          <TopHeaderSection
            header={headers.top}
            columnWidths={columnWidths}
            visibleColumns={visibleColumns}
            scrollLeft={scrollLeft}
            leftOffset={headers.left?.size ?? 0}
            headers={headers}
            rowHeights={rowHeights}
          />
        ) : null}

        {headers.left ? (
          <LeftHeaderSection
            header={headers.left}
            columnWidths={columnWidths}
            visibleRows={visibleRows}
            scrollTop={scrollTop}
            leftOffset={headers.left?.size ?? 0}
            headers={headers}
            rowHeights={rowHeights}
          />
        ) : null}

        {headers.right ? (
          <RightHeaderSection
            header={headers.right}
            columnWidths={columnWidths}
            visibleRows={visibleRows}
            scrollTop={scrollTop}
            leftOffset={headers.left?.size ?? 0}
            headers={headers}
            rowHeights={rowHeights}
            scrollbarSize={scrollbarSize}
            width={width}
          />
        ) : null}

        {headers.bottom ? (
          <BottomHeaderSection
            header={headers.bottom}
            columnWidths={columnWidths}
            visibleColumns={visibleColumns}
            scrollLeft={scrollLeft}
            leftOffset={headers.left?.size ?? 0}
            headers={headers}
            rowHeights={rowHeights}
            scrollbarSize={scrollbarSize}
            height={height}
          />
        ) : null}
      </div>
    </div>
  );
};
