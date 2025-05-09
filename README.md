#  react-virtualized-flex

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

npm install react-virtualized-flex

The VirtualizedList handles large lists efficiently by only rendering items visible in the viewport (plus a small customizable over-scan). It supports both horizontal and vertical scrolling.

<details> <summary>
import { VirtualizedList } from "react-virtualized-flex";

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
</summary></details>


###  Props: `VirtualizedListProps<T, Item>`

| Prop              | Type                                                                     | Description                                        |
|-------------------|--------------------------------------------------------------------------|----------------------------------------------------|
| `data`            | `T[]`                                                                    | Array of items to render                           |
| `itemSize`        | `number` \| `number[]`                                                   | Fixed or variable size per item                    |
| `ItemComponent`   | `React.ComponentType`                                                    | Component to render each item                      |
| `direction`       | `"vertical"` \| `"horizontal"`                                           | Scroll direction                                   |
| `height` / `width`| `number`                                                                 | Viewport size (depending on direction)             |
| `overScanCount`   | `number` _(optional)_                                                    | Extra items rendered outside viewport              |
| `onScroll`        | `(offset: number) => void` _(optional)_                                  | Callback fired when scrolling                      |
| `WrapperComponent`| `React.ComponentType<{ children: React.ReactNode }>` _(optional)_        | Custom wrapper around list content                 |
| `additionalData`  | `any` _(optional)_                                                       | Additional props passed to `ItemComponent`         |

License
MIT © MathewMathew1
