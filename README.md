#  virtualized-list

A lightweight, flexible, and type-safe virtualized list and table component for rendering large datasets efficiently using React. Designed to be minimal yet extensible with customizable wrappers, item rendering, and scroll handling.

---

## Features

- Supports **vertical and horizontal** virtualization
- Easily customizable `ItemComponent` rendering
- Scroll-to-index & ref access
- Handles dynamic item sizes
- Simple API with rich TypeScript support

---

##  Installation

npm i @mathewmathew1/virtualized-list

The VirtualizedList handles large lists efficiently by only rendering items visible in the viewport (plus a small customizable over-scan). It supports both horizontal and vertical scrolling.

``` javascript
import { VirtualizedList } from from "@mathewmathew1/virtualized-list";

const MyItem = ({ data, index, style }) => (
  <div style={style}>{data[index]}</div>
);

<VirtualizedList
  data={myItems}
  itemSize={40}
  direction="vertical"
  height={300}
  ItemComponent={MyItem}
/>
```


###  Props: `VirtualizedListProps<T, Item>`

| Prop              | Type                                                                     | Description                                        |
|-------------------|--------------------------------------------------------------------------|----------------------------------------------------|
| `data`            | `T[]`                                                                    | Array of items to render                           |
| `itemSize`        | `number` \| `number[] \| ((index: number) => number)`                    | Fixed or variable size per item                    |
| `ItemComponent`   | `React.ComponentType`                                                    | Component to render each item                      |
| `direction`       | `"vertical"` \| `"horizontal"`                                           | Scroll direction                                   |
| `height` / `width`| `number`                                                                 | Viewport size (depending on direction)             |
| `overScanCount`   | `number` _(optional)_ 5 by default                                       | Extra items rendered outside viewport              |
| `onScroll`        | `(offset: number) => void` _(optional)_                                  | Callback fired when scrolling                      |
| `WrapperComponent`| `React.ComponentType<{ children: React.ReactNode }>` _(optional)_        | Custom wrapper around list content                 |
| `additionalData`  | `any` _(optional)_                                                       | Additional props passed to `ItemComponent`         |



###  Props: `VirtualizedTableProps<T, Item>`
| Prop                     | Type                                                                                       | Required | Description                                                                                     |
|--------------------------|--------------------------------------------------------------------------------------------|----------|-------------------------------------------------------------------------------------------------|
| `rowCount`               | `number`                                                                                   | ✅       | Total number of rows.                                                                          |
| `columnCount`            | `number`                                                                                   | ✅       | Total number of columns.                                                                       |
| `rowHeights`             | `number \| number[] \| ((index: number) => number)`                                        | ✅       | Height of each row (fixed or variable per index).                                              |
| `columnWidths`           | `number \| number[] \| ((index: number) => number)`                                        | ✅       | Width of each column (fixed or variable per index).                                            |
| `height`                 | `number`                                                                                   | ✅       | Height of the visible table viewport.                                                          |
| `width`                  | `number`                                                                                   | ✅       | Width of the visible table viewport.                                                           |
| `CellComponent`          | `React.ComponentType<{ rowIndex, columnIndex, style }>`                                    | ✅       | Component used to render individual cells.                                                     |
| `overScanCount`          | `number`                                                                                   | ❌       | Additional rows/columns rendered beyond viewport for smoother scrolling. Default: `3`.         |
| `onScroll`               | `(xOffset: number, yOffset: number) => void`                                               | ❌       | Callback triggered on scroll.                                                                  |
| `WrapperComponent`       | `React.ComponentType<{ children: React.ReactNode }>`                                       | ❌       | Optional wrapper around the entire table content.                                              |
| `headers`                | `Partial<Record<"top" \| "bottom" \| "left" \| "right", VirtualizedTableHeader>>`          | ❌       | Defines sticky headers for each table side.                                                    |
| `AbsoluteElementComponent` | `React.ComponentType<{ currentLeftOffset: number; currentTopOffset: number }>`           | ❌       | Component rendered absolutely in scroll container (e.g. indicators, overlays).                 |
| `additionalData`         | `any`                                                                                      | ❌       | Additional data passed to CellComponent.


Header type
```typescript
  {
  type: "custom";
  size: number;
  component: React.ComponentType<{
    position: { left: number; top: number };
    visibleRows: { firstVisible: number; lastVisible: number };
    visibleColumns: { firstVisible: number; lastVisible: number };
  }>;
}
{
  type: "cell";
  size: number;
  component: React.ComponentType<{
    columnIndex: number;
    style: VirtualizedHeaderStyle;
  }>;
}

```

License
MIT © MathewMathew1
