export function getSize(
  size: number | number[] | ((index: number) => number),
  index: number
): number {
  if (typeof size === "function") return size(index);
  if (Array.isArray(size)) return size[index] ?? 0;
  return size;
}

export function getOffset(
  size: number | number[] | ((index: number) => number),
  index: number
): number {
  if (typeof size === "function") {
    let total = 0;
    for (let i = 0; i < index; i++) total += size(i);
    return total;
  }
  if (Array.isArray(size)) {
    return size.slice(0, index).reduce((a, b) => a + b, 0);
  }
  return index * size;
}

export function getTotalSize(
  size: number | number[] | ((index: number) => number),
  count: number
): number {
  if (typeof size === "function") {
    let total = 0;
    for (let i = 0; i < count; i++) total += size(i);
    return total;
  }
  if (Array.isArray(size)) return size.reduce((a, b) => a + b, 0);
  return size * count;
}
