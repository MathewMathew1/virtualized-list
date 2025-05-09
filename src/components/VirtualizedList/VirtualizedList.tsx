import { VirtualizedListProps, VirtualizedListRef } from "../../types/VirtualizedListTypes";
import { useVisibleIndices } from "../../hooks/useVisibleIndices";
import { useScrollOffset } from "../../hooks/useScrollOffset";
import { forwardRef, Ref, useRef } from "react";
import { useVirtualizedHandle } from "../../hooks/useVirtualizeHandle";
import VirtualizedListContent from "./VirtualizedContent";
import { getTotalSize } from "../../helpers/size";

const VirtualizedListInner = <
T,
Item extends React.ComponentType<any>
>(
  {
    data,
    itemSize,
    height,
    direction,
    ItemComponent,
    width,
    overScanCount = 5,
    onScroll,
    additionalData,
    WrapperComponent,
  }: VirtualizedListProps<T, Item>,
  ref: React.Ref<VirtualizedListRef>
) => {
  const scrollContainerRef = useRef<HTMLDivElement|null>(null);
  const { scrollOffset, handleScroll } = useScrollOffset(onScroll);

  const totalSize = getTotalSize(itemSize, data.length) 
  const elementVisibility = useVisibleIndices(
    data.length,
    itemSize,
    scrollOffset,
    direction === "horizontal" ? width || 0 : height,
    overScanCount,
    0
  );

  useVirtualizedHandle(ref, {
    direction,
    itemSize,
    scrollContainerRef,
    getScrollOffset: () => scrollOffset,
  });

  const innerStyle: React.CSSProperties = {
    position: "relative",
    height: direction === "vertical" ? totalSize : height,
    width: direction === "horizontal" ? totalSize : width,
  };

  return (
    <div
      ref={scrollContainerRef}
      style={{
        height,
        width,
        overflowY: direction === "vertical" ? "auto" : "hidden",
        overflowX: direction === "horizontal" ? "auto" : "hidden",
        position: "relative",
      }}
      onScroll={(e) => handleScroll(e, direction)}
    >

      
      {WrapperComponent ? (
        <WrapperComponent>
          <VirtualizedListContent
            data={data}
            itemSize={itemSize}
            direction={direction}
            firstVisible={elementVisibility.firstVisible}
            lastVisible={elementVisibility.lastVisible}
            ItemComponent={ItemComponent}
            additionalData={additionalData!}
            innerStyle={innerStyle}
          />
        </WrapperComponent>
      ) : (
        <VirtualizedListContent
          data={data}
          itemSize={itemSize}
          direction={direction}
          firstVisible={elementVisibility.firstVisible}
          lastVisible={elementVisibility.lastVisible}
          ItemComponent={ItemComponent}
          additionalData={additionalData!}
          innerStyle={innerStyle}
        />
      )}
    </div>
  );
};

export const VirtualizedList = forwardRef(VirtualizedListInner) as <
  T,
  Item extends React.ComponentType<any>
>(
  props: VirtualizedListProps<T, Item> & { ref?: Ref<VirtualizedListRef> }
) => any



