const drawCircleOnCanvas = (context: CanvasRenderingContext2D, x: number, y: number, color: { r: number,g: number,b: number}, blockSize: number) => {
  context.beginPath();
  context.arc(x + (blockSize / 2), y + (blockSize / 2), blockSize / 2, 0, 2 * Math.PI);
  context.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
  context.fill();
}

const drawSquareOnCanvas = (context: CanvasRenderingContext2D, x: number, y: number, color: { r: number,g: number,b: number}, blockSize: number) => {
  context.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
  context.fillRect(x, y, blockSize, blockSize);
}

export { drawCircleOnCanvas, drawSquareOnCanvas }