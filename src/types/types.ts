type rgbaType = {
  r: number,
  g: number,
  b: number,
  a: number,
}

type LegoColor = {
  colorName: string;
  color: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
};

type LegoColorsObject = { [key: number]: LegoColor };

export type { rgbaType, LegoColor, LegoColorsObject };