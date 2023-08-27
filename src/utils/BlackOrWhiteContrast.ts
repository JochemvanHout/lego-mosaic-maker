export const getBlackorWhiteContrast = (hexColor: string) => {
  
  const rawHexColor = hexColor.slice(1);
  
  const r = parseInt(rawHexColor.substring(0, 2), 16);
  const g = parseInt(rawHexColor.substring(2, 4), 16);
  const b = parseInt(rawHexColor.substring(4, 6), 16);
  
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luminance > 0.5 ? 'black' : 'white';
}