import { defineStore } from 'pinia';
import type { LegoColorsObject } from '@/types/types';
import LegoColors from '@/utils/LegoColors';

type colorStore = {
  colors: null | LegoColorsObject,
  selectedColors: number[]
}

export const useColorStore = defineStore('colorStore', {
  state: (): colorStore => ({
    colors: {},
    selectedColors: [],
  }),
  actions: {
    loadLegoColors () {        
      this.colors = LegoColors;
    },
    unselectAllColors () {
      this.selectedColors = [];
    },
    selectAllColors () {
      Object.keys(this.colors!).forEach(key => {
        this.selectedColors.push(parseInt(key))
      });
    },
  }
});
