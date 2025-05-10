  export function hasScrollbar(element: HTMLDivElement) {
    if (!element) return { vertical: false, horizontal: false };

    const hasVerticalScrollbar = element.scrollHeight > element.clientHeight;
    const hasHorizontalScrollbar = element.scrollWidth > element.clientWidth;

    return {
      vertical: hasVerticalScrollbar,
      horizontal: hasHorizontalScrollbar,
    };
  }