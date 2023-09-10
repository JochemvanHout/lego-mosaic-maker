import { defineStore } from 'pinia';
import type { LegoColorsObject, rgbType } from '@/types/types';
import LegoColors from '@/utils/LegoColors';

type colorStore = {
  colors: null | LegoColorsObject,
}

export const useColorStore = defineStore('colorStore', {
  state: (): colorStore => ({
    colors: {},
  }),
  actions: {
    loadLegoColors() {        
      this.colors = LegoColors;
    },
    unselectAllColors() {
      Object.keys(this.colors!).forEach((key) => (this.colors![key].selected = false));
    },
    selectAllColors() {
      Object.keys(this.colors!).forEach((key) => (this.colors![key].selected = true));
    },
    resetColorCount() {
      Object.keys(this.colors!).forEach((key) => (this.colors![key].count = 0));
    },
    addColorCount(legoColor: rgbType) {
      Object.keys(this.colors!).forEach((key) => {
        if(this.colors![key].rgb === legoColor) {
          this.colors![key].count += 1;
        }
      })
    },
    getColorsCount() {
      const result: {name: string, count: number}[] = [];

      for (const colorName in this.colors) {
        const colorItem = this.colors[colorName];
        if (colorItem.count > 0) {
          result.push({ name: colorName, count: colorItem.count});
        }
      }
    
      return result;
    }
  }
});
