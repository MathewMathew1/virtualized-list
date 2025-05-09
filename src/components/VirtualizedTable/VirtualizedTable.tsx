import { forwardRef, Ref, useRef } from "react";
import type {
  VirtualizedTableProps,
  VirtualizedTableRef,
} from "../../types/VirtualizedTableTypes";
import { useVisibleIndices } from "../../hooks/useVisibleIndices";
import VirtualizedTableContent from "./VirtualizedTableContent";
import { useScrollOffset2D } from "../../hooks/useScroll2D";
import { useVirtualizedHandle2D } from "../../hooks/useVirtualizeHandle2d";
import { StickyHeaders } from "../StickyHeader/StickyHeaders";
import useScrollSize from "../../hooks/useScrollSize";

export const VirtualizedTableInner = <Item extends React.ComponentType<any>>(
  {
    rowCount,
    columnCount,
    rowHeights,
    columnWidths,
    height,
    width,
    CellComponent,
    onScroll,
    WrapperComponent,
    overScanCount = 3,
    headers,
    AbsoluteElementComponent,
  }: VirtualizedTableProps<Item>,
  ref: React.Ref<VirtualizedTableRef>
) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollTop, scrollLeft, handleScroll } = useScrollOffset2D(onScroll);

  useVirtualizedHandle2D(ref, {
    scrollContainerRef: scrollRef,
    rowHeights,
    columnWidths,
    getScrollOffset: () => ({
      scrollTop,
      scrollLeft,
    }),
  });

  const paddingInHeight = (headers?.top?.size || 0) + (headers?.bottom?.size || 0)
  const paddingInWidth = (headers?.left?.size || 0 ) + (headers?.right?.size || 0)


  const elementVisibilityRows = useVisibleIndices(
    rowCount,
    rowHeights,
    scrollTop,
    height,
    overScanCount,
    paddingInHeight
  );
  const elementVisibilityCols = useVisibleIndices(
    columnCount,
    columnWidths,

    scrollLeft,
    width,
    overScanCount,
    paddingInWidth
  );

  const totalHeight = Array.isArray(rowHeights)
    ? rowHeights.reduce((a, b) => a + b, 0)
    : rowHeights * rowCount;

  const totalWidth = Array.isArray(columnWidths)
    ? columnWidths.reduce((a, b) => a + b, 0)
    : columnWidths * columnCount;

  const innerStyle: React.CSSProperties = {
    position: "relative",
  };

  const { scrollbarSize } = useScrollSize({ scrollRef });

  return (
    <div
      ref={scrollRef}
      style={{ width, height, overflow: "auto", position: "relative" }}
      onScroll={(e) => handleScroll(e)}
    >
      <StickyHeaders
        headers={headers}
        rowHeights={rowHeights}
        columnWidths={columnWidths}
        visibleRows={elementVisibilityRows}
        visibleColumns={elementVisibilityCols}
        height={height}
        width={width}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        scrollbarSize={scrollbarSize}
      />
      {AbsoluteElementComponent ? <AbsoluteElementComponent currentLeftOffset={scrollLeft} currentTopOffset={scrollTop} /> : null}
      <div
        style={{
          height: totalHeight,
          width: totalWidth,
          position: "relative",
          paddingLeft: headers?.left?.size ?? 0,
          paddingBottom: headers?.bottom?.size,
          paddingRight: headers?.right?.size,
          paddingTop: headers?.top?.size,
        }}
      >
        {WrapperComponent ? (
          <WrapperComponent>
            <VirtualizedTableContent
              rowHeights={rowHeights}
              columnWidths={columnWidths}
              visibleRows={elementVisibilityRows}
              visibleColumns={elementVisibilityCols}
              CellComponent={CellComponent}
              innerStyle={innerStyle}
            />
          </WrapperComponent>
        ) : (
          <VirtualizedTableContent
            rowHeights={rowHeights}
            columnWidths={columnWidths}
            visibleRows={elementVisibilityRows}
            visibleColumns={elementVisibilityCols}
            CellComponent={CellComponent}
            innerStyle={innerStyle}
          />
        )}
      </div>
    </div>
  );
};

export const VirtualizedTable = forwardRef(VirtualizedTableInner) as <
  T,
  Item extends React.ComponentType<any>
>(
  props: VirtualizedTableProps<Item> & { ref?: Ref<VirtualizedTableRef> }
) => any;
