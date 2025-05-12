import { useEffect, useState } from "react";
import { getSize } from "../helpers/size";

export const useTotalSize = (itemSize: number[] | number | ((index: number) => number), length: number) => {
  const [total, setTotal] = useState(0);
  const [sizesOffsetOfIndice, setSizeOffsetOfIndice] = useState<number[]>([])
  const [sizesSet, setSizesSet] = useState(false)

  const setValuesSinceIndex = (index: number, itemSize: number[] | ((index: number) => number)) => {
    const newSizesOfIndice = sizesOffsetOfIndice.slice(0, index)
    let offset = sizesOffsetOfIndice[index-1]||0
    for(let i=index; i<length; i++){
      
      newSizesOfIndice.push(offset)
      offset += getSize(itemSize, i);
    }

    setSizeOffsetOfIndice(newSizesOfIndice)
    setTotal(offset)
    setSizesSet(true)
  }

  useEffect(() => {
    if (typeof itemSize === "number") {
      setTotal(length * itemSize);
    } else {
      setValuesSinceIndex(0, itemSize)
    }
  }, []);

  return {total, setValuesSinceIndex, sizesOffsetOfIndice, sizesSet}
};
