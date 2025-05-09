import { useEffect, useState } from "react";

export const useTotalSize = (itemSize: number | number[], length: number) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (Array.isArray(itemSize)) {
      setTotal(itemSize.reduce((sum, size) => sum + size, 0));
    } else {
      setTotal(length * itemSize);
    }
  }, [itemSize, length]);

  return total;
};
