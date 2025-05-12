import {
  CSSProperties,
  forwardRef,
  Ref,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
    additionalData,
  }: VirtualizedTableProps<Item>,
  ref: React.Ref<VirtualizedTableRef>,
) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollTop, scrollLeft, handleScroll } = useScrollOffset2D(onScroll);

  const [offsetVersion, setOffsetVersion] = useState(0);

  const [paddingInHeight, paddingInWidth] = useMemo(() => {
    return [
      (headers?.top?.size || 0) + (headers?.bottom?.size || 0),
      (headers?.left?.size || 0) + (headers?.right?.size || 0),
    ];
  }, [headers]);

  const elementVisibilityRows = useVisibleIndices(
    rowCount,
    rowHeights,
    scrollTop,
    height,
    overScanCount,
    paddingInHeight,
  );
  const elementVisibilityCols = useVisibleIndices(
    columnCount,
    columnWidths,

    scrollLeft,
    width,
    overScanCount,
    paddingInWidth,
  );

  useEffect(() => {
    setOffsetVersion(prev => prev +1 )
  }, [elementVisibilityCols.sizesOffsetOfIndice, elementVisibilityRows.sizesOffsetOfIndice]);

  useVirtualizedHandle2D(ref, {
    scrollContainerRef: scrollRef,
    rowHeights,
    columnWidths,
    getScrollOffset: () => ({
      scrollTop,
      scrollLeft,
    }),
    setColValuesSinceIndex: elementVisibilityCols.setValuesSinceIndex,
    setRowValuesSinceIndex: elementVisibilityRows.setValuesSinceIndex,
  });

  const { scrollbarSize } = useScrollSize({ scrollRef });

  const contentStyle: CSSProperties = useMemo(
    () => ({
      height: elementVisibilityRows.total,
      width: elementVisibilityCols.total,
      position: "relative",
      paddingLeft: headers?.left?.size ?? 0,
      paddingBottom: headers?.bottom?.size,
      paddingRight: headers?.right?.size,
      paddingTop: headers?.top?.size,
    }),
    [elementVisibilityRows.total, elementVisibilityCols.total, headers],
  );

  return (
    <div
      ref={scrollRef}
      style={{
        width,
        height,
        overflow: "auto",
        position: "relative",
        scrollBehavior: "smooth",
        willChange: "transform",
      }}
      onScroll={(e) => handleScroll(e)}
    >
      <StickyHeaders
        headers={headers}
        rowHeights={rowHeights}
        columnWidths={columnWidths}
        visibleRows={elementVisibilityRows.visible}
        visibleColumns={elementVisibilityCols.visible}
        height={height}
        width={width}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        scrollbarSize={scrollbarSize}
      />

      <div style={contentStyle}>
        {AbsoluteElementComponent ? (
          <AbsoluteElementComponent
            currentLeftOffset={scrollLeft}
            currentTopOffset={scrollTop}
            getElementLeftOffset={(index: number) => {
              const offset =
                typeof columnWidths === "number"
                  ? columnWidths * index
                  : elementVisibilityCols.sizesOffsetOfIndice[index];
              return offset;
            }}
            getElementTopOffset={(index: number) => {
              const offset =
                typeof rowHeights === "number"
                  ? rowHeights * index
                  : elementVisibilityRows.sizesOffsetOfIndice[index];
              return offset;
            }}
            offsetVersion={offsetVersion}
          />
        ) : null}
        {WrapperComponent ? (
          <WrapperComponent>
            <VirtualizedTableContent
              rowsOffsets={elementVisibilityRows.sizesOffsetOfIndice}
              columnsOffsets={elementVisibilityCols.sizesOffsetOfIndice}
              rowHeights={rowHeights}
              columnWidths={columnWidths}
              visibleRows={elementVisibilityRows.visible}
              visibleColumns={elementVisibilityCols.visible}
              CellComponent={CellComponent}
              additionalData={additionalData}
              offsetVersion={offsetVersion}
            />
          </WrapperComponent>
        ) : (
          <VirtualizedTableContent
            rowHeights={rowHeights}
            rowsOffsets={elementVisibilityRows.sizesOffsetOfIndice}
            columnWidths={columnWidths}
            columnsOffsets={elementVisibilityCols.sizesOffsetOfIndice}
            visibleRows={elementVisibilityRows.visible}
            visibleColumns={elementVisibilityCols.visible}
            CellComponent={CellComponent}
            additionalData={additionalData}
            offsetVersion={offsetVersion}
          />
        )}
      </div>
    </div>
  );
};

export const VirtualizedTable = forwardRef(VirtualizedTableInner) as <
  T,
  Item extends React.ComponentType<any>,
>(
  props: VirtualizedTableProps<Item> & { ref?: Ref<VirtualizedTableRef> },
) => any;
