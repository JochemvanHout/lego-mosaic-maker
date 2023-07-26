type rgbType = {
  r: number,
  g: number,
  b: number,
}

type LegoColorItem = {
  color: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  selected: false;
};

type LegoColorsObject = { [colorName: string]: LegoColorItem };

export type { rgbType, LegoColorItem, LegoColorsObject };