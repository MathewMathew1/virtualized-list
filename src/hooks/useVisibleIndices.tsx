import { useEffect, useState } from "react";
import { getSize } from "../helpers/size";
import { useTotalSize } from "./useTotalSize";
import { searchStartingIndex } from "../helpers/search";

export function useVisibleIndices(
  dataLength: number,
  itemSize: number[] | number | ((index: number) => number),
  scrollOffset: number,
  viewportSize: number,
  buffer: number,
  padding: number
) {
  const [visible, setVisible] = useState({ firstVisible: 0, lastVisible: 0 });
  const { total, setValuesSinceIndex, sizesOffsetOfIndice, sizesSet } =
    useTotalSize(itemSize, dataLength);

  useEffect(() => {
    const viewportSizeWithPadding = viewportSize - padding;

    if (Array.isArray(itemSize) || typeof itemSize === "function") {
      if (!sizesSet) return;
      const startingIndex = searchStartingIndex(
        sizesOffsetOfIndice,
        0,
        0,
        dataLength - 1,
        scrollOffset
      );

      let currentOffset = sizesOffsetOfIndice[startingIndex] || 0,
        end = startingIndex;

      for (let i = startingIndex; i < dataLength; i++) {
        if (currentOffset < scrollOffset + viewportSizeWithPadding) {
          end = i;
        } else {
          break;
        }
        currentOffset += getSize(itemSize, i);
      }

      const first = Math.max(startingIndex - buffer, 0);
      const last = Math.min(end + buffer, dataLength - 1);
      setVisible((prev) => {
        if (prev.firstVisible !== first || prev.lastVisible !== last) {
          return { firstVisible: first, lastVisible: last };
        }
        return prev;
      });
    } else {
      const first = Math.max(Math.floor(scrollOffset / itemSize) - buffer, 0);

      const last = Math.min(
        Math.ceil((scrollOffset + viewportSizeWithPadding) / itemSize) +
          buffer -
          1,
        dataLength - 1
      );

      setVisible((prev) => {
        if (prev.firstVisible !== first || prev.lastVisible !== last) {
          return { firstVisible: first, lastVisible: last };
        }
        return prev;
      });
    }
  }, [
    scrollOffset,
    itemSize,
    viewportSize,
    buffer,
    dataLength,
    sizesOffsetOfIndice,
    sizesSet,
  ]);

  return {visible, total}
}
