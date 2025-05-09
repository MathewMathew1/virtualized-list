import { useEffect, useState } from "react";

const useScrollSize = ({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
}) => {
  const [scrollbarSize, setScrollbarSize] = useState({ height: 0, width: 0 });

  function hasScrollbar(element: HTMLDivElement) {
    if (!element) return { vertical: false, horizontal: false };

    const hasVerticalScrollbar = element.scrollHeight > element.clientHeight;
    const hasHorizontalScrollbar = element.scrollWidth > element.clientWidth;

    return {
      vertical: hasVerticalScrollbar,
      horizontal: hasHorizontalScrollbar,
    };
  }

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const hasScrollBar = hasScrollbar(el)

      const scrollbarHeight = hasScrollBar.horizontal? el.offsetHeight - el.clientHeight: 0
      const scrollbarWidth = hasScrollBar.vertical? el.offsetWidth - el.clientWidth: 0
      setScrollbarSize({ height: scrollbarHeight, width: scrollbarWidth });
    
    }
  }, [scrollRef.current]);

  return { scrollbarSize };
};

export default useScrollSize;
