import { Direction, VirtualizedItemStyle } from "../types/VirtualizedListTypes";

export const getItemOffset = (itemSize: number | number[], index: number) => {
  if (Array.isArray(itemSize)) {
    return itemSize.slice(0, index).reduce((sum, size) => sum + size, 0);
  }
  return index * itemSize;
};

export const getItemSize = (itemSize: number | number[], index: number) => {
  return Array.isArray(itemSize) ? itemSize[index] : itemSize;
};

export const getItemStyle = (
  index: number,
  itemSize: number | number[],
  direction: Direction,
): VirtualizedItemStyle => {
  const offset = getItemOffset(itemSize, index);
  const size = getItemSize(itemSize, index);

  return direction === "vertical"
    ? {
        position: "absolute",
        top: offset,
        height: size,
        left: 0,
        right: 0,
      }
    : {
        position: "absolute",
        left: offset,
        width: size,
        top: 0,
        bottom: 0,
      };
};
