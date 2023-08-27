import type { rgbType } from '@/types/types';

const euclideanDistance = (color1: rgbType, color2: rgbType): number => {
  const diffR = color1.r - color2.r;
  const diffG = color1.g - color2.g;
  const diffB = color1.b - color2.b;
  return Math.sqrt(diffR * diffR + diffG * diffG + diffB * diffB);
}

export const findClosestMatchingColor = (rgbColor: rgbType, matchingArray: rgbType[]) => {
  let closestColor = matchingArray[0];
  let minDistance = euclideanDistance(rgbColor, closestColor);

  for (const color of matchingArray) {
    const distance = euclideanDistance(rgbColor, color);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color;
    }
  }

  return closestColor;
}
