export const searchStartingIndex = (
  itemOffsets: number[],
  lookedIndex: number,
  lowerBoundaryIndex: number,
  upperBoundaryIndex: number,
  currentOffset: number
): number => {

  if (lowerBoundaryIndex > upperBoundaryIndex) {
    return Math.max(0, Math.min(lookedIndex, itemOffsets.length - 1));
  }

  const lookedItemOffset = itemOffsets[lookedIndex];
  const nextItemOffset = itemOffsets[lookedIndex + 1];

  if (
    lookedItemOffset <= currentOffset &&
    (nextItemOffset > currentOffset || nextItemOffset === undefined)
  ) {
    return lookedIndex;
  }

  if (lookedItemOffset < currentOffset) {
    lowerBoundaryIndex = lookedIndex + 1;
  } else {
    upperBoundaryIndex = lookedIndex - 1;
  }

  const lowerOffset = itemOffsets[lowerBoundaryIndex];
  const upperOffset = itemOffsets[upperBoundaryIndex];

  const offsetRange = upperOffset - lowerOffset;
  const offsetSinceStart = currentOffset - lowerOffset;

  const percentage = offsetRange > 0 ? offsetSinceStart / offsetRange : 0;
  const addedIndex = Math.floor((upperBoundaryIndex - lowerBoundaryIndex) * percentage);

  const newIndex = Math.max(
    lowerBoundaryIndex,
    Math.min(lookedIndex + addedIndex, upperBoundaryIndex)
  );

  return searchStartingIndex(
    itemOffsets,
    newIndex,
    lowerBoundaryIndex,
    upperBoundaryIndex,
    currentOffset
  );
};

