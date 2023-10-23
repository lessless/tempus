import Chart from "chart.js/auto";

export const NavigationGrid = {
  mounted() {
    const canvas = this.el;
    const ctx = canvas.getContext("2d");

    const gridSize = 11; // 11x11 grid
    const cellSize = 40; // Each cell is 40x40 pixels

    this.setCanvasDimensions(canvas, gridSize, cellSize);
    this.drawGrid(ctx, gridSize, cellSize);
  },

  setCanvasDimensions(canvas, gridSize, cellSize) {
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
  },

  drawGrid(ctx, gridSize, cellSize) {
    for (let i = 0; i <= gridSize; i++) {
      this.drawLine(ctx, i * cellSize, 0, i * cellSize, gridSize * cellSize); // Vertical line
      this.drawLine(ctx, 0, i * cellSize, gridSize * cellSize, i * cellSize); // Horizontal line
    }
  },
  drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  },
};
