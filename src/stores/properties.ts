import { defineStore } from 'pinia';

type colorStore = {
  brushSize: number,
  canvasSize: { height: number, width: number },
  hasImage: boolean,
  uploadContext: null | CanvasRenderingContext2D,
}

export const usePropertiesStore = defineStore('propertiesStore', {
  state: (): colorStore => ({
    brushSize: 10,
    canvasSize: {
      height: 0,
      width: 0,
    },
    hasImage: false,
    uploadContext: null
  }),
  actions: {
  }
});
