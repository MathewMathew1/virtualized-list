export type ScrollAlign = "start" | "center" | "end";
export type ScrollOptions = {
  offsetX?: number;
  offsetY?: number;
  alignX?: ScrollAlign;
  alignY?: ScrollAlign;
};

export interface VirtualizedTableCellStyle extends React.CSSProperties {}

export interface VirtualizedTableRef {
  scrollTo: (row: number, col: number, options?: ScrollOptions) => void;
  getScrollOffset: () => { scrollLeft: number; scrollTop: number };
  updateVisualSinceCol: (index: number) => void;
  updateVisualSinceRow: (index: number) => void;
}

export interface VirtualizedTableContentProps<K> {
  rowHeights: number[] | number | ((index: number) => number);
  columnWidths: number[] | number | ((index: number) => number);
  visibleRows: { firstVisible: number; lastVisible: number };
  visibleColumns: { firstVisible: number; lastVisible: number };
  CellComponent: React.ComponentType<{
    rowIndex: number;
    columnIndex: number;
    style: VirtualizedTableCellStyle;
    additionalData: K extends undefined ? undefined : K;
  }>;
  additionalData: K;
  rowsOffsets: number[];
  columnsOffsets: number[];
  offsetVersion: number;
}

type InferAdditionalData<T> =
  T extends React.ComponentType<infer P>
    ? P extends { additionalData: infer A }
      ? A
      : undefined
    : never;

export type VirtualizedTableProps<Item extends React.ComponentType<any>> = {
  rowCount: number;
  columnCount: number;
  rowHeights: number[] | number | ((index: number) => number);
  columnWidths: number[] | number | ((index: number) => number);
  overScanCount?: number;
  height: number;
  width: number;
  CellComponent: Item;
  AbsoluteElementComponent?: React.ComponentType<{
    currentLeftOffset: number;
    currentTopOffset: number;
    getElementLeftOffset: (index: number) => number;
    getElementTopOffset: (index: number) => number;
    offsetVersion: number;
  }>;
  WrapperComponent?: React.ComponentType<{ children: React.ReactNode }>;
  headers?: Partial<Record<HeaderPosition, VirtualizedTableHeader>>;
  onScroll?: (xOffset: number, yOffset: number) => void;
} & (InferAdditionalData<Item> extends undefined
  ? { additionalData?: undefined }
  : { additionalData: InferAdditionalData<Item> });

export type ScrollSyncProps = {
  scrollLeft?: number;
  scrollTop?: number;
};

export type HeaderPosition = "top" | "bottom" | "left" | "right";

export type VirtualizedTableHeader =
  | {
      type: "cell";
      component: React.ComponentType<{
        columnIndex: number;
        style: VirtualizedHeaderStyle;
      }>;
      size: number;
    }
  | {
      type: "custom";
      component: React.ComponentType<{
        position: { left: number; top: number };
        visibleRows: { firstVisible: number; lastVisible: number };
        visibleColumns: { firstVisible: number; lastVisible: number };
      }>;
      size: number;
    };

export type VirtualizedHeaderStyle = {
  position: "absolute";
  top: number;
  height?: number;
  width?: number;
  left: number;
} & React.CSSProperties;
