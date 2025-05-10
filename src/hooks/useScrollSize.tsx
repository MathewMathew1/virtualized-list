import { useEffect, useState } from "react";
import { hasScrollbar } from "../helpers/scroll";

const useScrollSize = ({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
}) => {
  const [scrollbarSize, setScrollbarSize] = useState({ height: 0, width: 0 });

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const hasScrollBar = hasScrollbar(el);

      const scrollbarHeight = hasScrollBar.horizontal
        ? el.offsetHeight - el.clientHeight
        : 0;
      const scrollbarWidth = hasScrollBar.vertical
        ? el.offsetWidth - el.clientWidth
        : 0;
      setScrollbarSize({ height: scrollbarHeight, width: scrollbarWidth });
    }
  }, [scrollRef.current]);

  return { scrollbarSize };
};

export default useScrollSize;
