import { useEffect, useState } from "react";

export function useVisibleIndices(
  dataLength: number,
  itemSize: number | number[],
  scrollOffset: number,
  viewportSize: number,
  buffer: number,
  padding: number
) {
  const [visible, setVisible] = useState({firstVisible: 0, lastVisible: 0});

  useEffect(() => {
    const viewportSizeWithPadding = viewportSize - padding

    if (Array.isArray(itemSize)) {
      let current = 0, start = 0, end = 0;

      for (let i = 0; i < dataLength; i++) {
        if (current < scrollOffset + viewportSizeWithPadding) end = i;
        if (current < scrollOffset) start = i;
        current += itemSize[i] || 0;
      }

      const first = Math.max(start - buffer, 0);
      const last = Math.min(end + buffer, dataLength - 1);
      setVisible(prev => {
        if (prev.firstVisible !== first || prev.lastVisible !== last) {
          return { firstVisible: first, lastVisible: last };
        }
        return prev;
      });

    } else {
      const first = Math.max(Math.floor(scrollOffset / itemSize) - buffer, 0);
     
      const last = Math.min((Math.ceil((scrollOffset + viewportSizeWithPadding) / itemSize) + buffer), dataLength - 1);
     
      setVisible(prev => {
        if (prev.firstVisible !== first || prev.lastVisible !== last) {
          return { firstVisible: first, lastVisible: last };
        }
        return prev;
      });
    }
   

  }, [scrollOffset, itemSize, viewportSize, buffer, dataLength]);

  return visible;
}
