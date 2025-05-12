import { useEffect, useRef, useMemo, useState } from "react";
import { useTotalSize } from "./useTotalSize";
import { searchStartingIndex } from "../helpers/search";
import { getSize } from "../helpers/size";

export function useVisibleIndices(
  dataLength: number,
  itemSize: number[] | number | ((index: number) => number),
  scrollOffset: number,
  viewportSize: number,
  buffer: number,
  padding: number,
) {
  const [visible, setVisible] = useState({ firstVisible: 0, lastVisible: 0 });
  const { total, setValuesSinceIndex, sizesOffsetOfIndice, sizesSet } =
    useTotalSize(itemSize, dataLength);

  const lastFirstIndice = useRef(0);

  const rafRef = useRef<number | null>(null);

  const viewportSizeWithPadding = useMemo(
    () => viewportSize - padding,
    [viewportSize, padding],
  );

  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (Array.isArray(itemSize) || typeof itemSize === "function") {
        if (!sizesSet) return;

        const startingIndex = searchStartingIndex(
          sizesOffsetOfIndice,
          lastFirstIndice.current,
          0,
          dataLength - 1,
          scrollOffset,
        );

        lastFirstIndice.current = startingIndex;

        let currentOffset = sizesOffsetOfIndice[startingIndex] || 0;
        let end = startingIndex;

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
          if (visible.firstVisible !== first || visible.lastVisible !== last)
            return { firstVisible: first, lastVisible: last };
          return prev;
        });
      } else {
        const first = Math.max(Math.floor(scrollOffset / itemSize) - buffer, 0);

        const last = Math.min(
          Math.ceil((scrollOffset + viewportSizeWithPadding) / itemSize) +
            buffer -
            1,
          dataLength - 1,
        );

        setVisible((prev) => {
          if (visible.firstVisible !== first || visible.lastVisible !== last)
            return { firstVisible: first, lastVisible: last };
          return prev;
        });
      }
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    scrollOffset,
    itemSize,
    viewportSizeWithPadding,
    buffer,
    dataLength,
    sizesOffsetOfIndice,
    sizesSet,
    visible.firstVisible,
    visible.lastVisible,
  ]);

  return { visible, total, setValuesSinceIndex, sizesOffsetOfIndice };
}
