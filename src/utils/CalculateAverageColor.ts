import type { rgbType } from "@/types/types";

export const calculateAverageColorFromClampedArray = (clampedArray: Uint8ClampedArray): rgbType => {
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