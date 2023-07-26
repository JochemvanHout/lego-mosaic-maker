import type { LegoColorItem, rgbType } from '@/types/types';
// import legoColors from '@/utils/LegoColors'

const getContrastColor = (hexColor: string) => {
  const rawHexColor = hexColor.slice(1);

  const r = parseInt(rawHexColor.substr(0, 2), 16);
  const g = parseInt(rawHexColor.substr(2, 2), 16);
  const b = parseInt(rawHexColor.substr(4, 2), 16);

  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luminance > 0.5 ? 'black' : 'white';
}

const calculateAverageColorFromClampedArray = (clampedArray: Uint8ClampedArray): rgbType => {
  const arrayLength = clampedArray?.length;

  const newColor = {
    r: 0,
    g: 0,
    b: 0,
  }

  for (let i=0; i < arrayLength; i += 4) {
    newColor.r += clampedArray[i];
    newColor.g += clampedArray[i + 1];
    newColor.b += clampedArray[i + 2];
  }

  Object.entries(newColor).forEach(([key, value]) => {
    // @ts-ignore
    newColor[key] = Math.floor(value / (arrayLength / 4));
  });

  return newColor;
}

const euclideanDistance = (color1, color2): number => {
  const diffR = color1.r - color2.r;
  const diffG = color1.g - color2.g;
  const diffB = color1.b - color2.b;
  return Math.sqrt(diffR * diffR + diffG * diffG + diffB * diffB);
}

const findClosestMatchingColor = (rgbColor: rgbType, matchingArray: rgbType[]) => {
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

export { getContrastColor, calculateAverageColorFromClampedArray, findClosestMatchingColor };