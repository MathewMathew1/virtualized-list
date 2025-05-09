export type VirtualizedItemStyle = {
  position: "absolute";
  top: number;
  height?: number;
  width?: number;
  left: number;
} & React.CSSProperties;

export type VirtualizedListRef = {
  getScrollOffset: () => number;
  scrollToIndex: (index: number) => void;
};

export type VirtualizedWrapperProps = {
  children: React.ReactNode;
  scrollRef: React.RefObject<HTMLDivElement>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  style: React.CSSProperties;
};

type InferAdditionalData<T> = T extends React.ComponentType<infer P>
  ? P extends { additionalData: infer A }
    ? A
    : undefined
  : never;

export type VirtualizedListBaseProps<
  T,
  Item extends React.ComponentType<any>
> = {
  data: T[];
  itemSize: number | number[];
  ItemComponent: Item;
  overScanCount?: number;
  onScroll?: (offset: number) => void;
  ref?: React.Ref<VirtualizedListRef>;
  WrapperComponent?: React.ComponentType<{ children: React.ReactNode }>
} & (InferAdditionalData<Item> extends undefined
  ? {additionalData?: undefined} 
  : { additionalData: InferAdditionalData<Item> }); 

  export type VirtualizedListProps<T, Item extends React.ComponentType<any>> =
  | (VirtualizedListBaseProps<T, Item> & {
      direction: "vertical";
      height: number;
      width?: number;
    })
  | (VirtualizedListBaseProps<T, Item> & {
      direction: "horizontal";
      width: number;
      height?: number;
    });

export type VirtualizedListContentProps<T, K> = {
  data: T[];
  itemSize: number | number[];
  direction: Direction;
  firstVisible: number;
  lastVisible: number;
  ItemComponent: React.ComponentType<{
    data: T[];
    index: number;
    style: VirtualizedItemStyle;
    additionalData: K extends undefined ? undefined : K;
  }>;
  additionalData: K;
  innerStyle: React.CSSProperties;
};

export type Direction = "vertical" | "horizontal";
