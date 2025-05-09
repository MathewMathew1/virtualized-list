import { Direction, VirtualizedItemStyle } from "../types/VirtualizedListTypes";
import { getOffset, getSize } from "./size";

export const getItemStyle = (
  index: number,
  itemSize: number[] | number | ((index: number) => number),
  direction: Direction,
): VirtualizedItemStyle => {
  const offset = getOffset(itemSize, index);
  const size = getSize(itemSize, index);

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
