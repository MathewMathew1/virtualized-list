import { useEffect, useState } from "react";
import { getSize } from "../helpers/size";

export function useVisibleIndices(
  dataLength: number,
  itemSize: number[] | number | ((index: number) => number),
  scrollOffset: number,
  viewportSize: number,
  buffer: number,
  padding: number
) {
  const [visible, setVisible] = useState({ firstVisible: 0, lastVisible: 0 });

  useEffect(() => {
    const viewportSizeWithPadding = viewportSize - padding;

    if (Array.isArray(itemSize) || typeof itemSize === "function") {
      let current = 0,
        start = 0,
        end = 0;

      for (let i = 0; i < dataLength; i++) {
        if (current < scrollOffset) start = i;
        if (current < scrollOffset + viewportSizeWithPadding) {
          end = i;
        } else {
          break;
        }
        current += getSize(itemSize, i);
        if(typeof itemSize == "function"){
          console.log({a: getSize(itemSize, i), viewportSizeWithPadding, current, i});
        }
        
      } 
      
      const first = Math.max(start - buffer, 0);
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
        Math.ceil((scrollOffset + viewportSizeWithPadding) / itemSize) + buffer - 1,
        dataLength - 1
      );

      setVisible((prev) => {
        if (prev.firstVisible !== first || prev.lastVisible !== last) {
          return { firstVisible: first, lastVisible: last };
        }
        return prev;
      });
    }
  }, [scrollOffset, itemSize, viewportSize, buffer, dataLength]);

  return visible;
}
