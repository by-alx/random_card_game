export function getRandomIndices(arrayLength: number, count: number) {
  if (count > arrayLength) {
    throw new Error(`Array length is ${arrayLength} and ${count} elements were requested.`);
  }

  // create an array with all possible indices
  const indices = Array.from({ length: arrayLength }, (_, i) => i);

  // shuffle the array with the Fisher-Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // take teh first `count` elements
  return indices.slice(0, count);
}