import { defineStore } from 'pinia';
import type { LegoColorsObject } from '@/types/types';
import LegoColors from '@/utils/LegoColors';

type colorStore = {
  colors: null | LegoColorsObject,
}

export const useColorStore = defineStore('colorStore', {
  state: (): colorStore => ({
    colors: {},
  }),
  actions: {
    loadLegoColors () {        
      this.colors = LegoColors;
    },
    unselectAllColors () {
      Object.keys(this.colors!).forEach((key) => ( this.colors![key].selected = false));
    },
    selectAllColors () {
      Object.keys(this.colors!).forEach((key) => ( this.colors![key].selected = true));
    },
  }
});
