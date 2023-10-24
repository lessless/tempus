const gridSize = 11; // 11x11 grid
const cellSize = 40; // Each cell is 40x40 pixels

import Canvas from "../canvas.js";

export const TransportationGrid = {
  mounted() {
    const canvas = this.el;
    const ctx = canvas.getContext("2d");

    this.setCanvasDimensions(canvas, gridSize, cellSize);
    Canvas.drawGrid(ctx, gridSize, cellSize);
    this.markStartingPoint(ctx, JSON.parse(this.el.dataset.startingPosition));

    this.handleEvent("move", (obj) => {
      this.move(obj, ctx);
    });
  },

  setCanvasDimensions(canvas, gridSize, cellSize) {
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
  },

  markStartingPoint(ctx, position) {
    Canvas.drawDot(ctx, position.x * cellSize, position.y * cellSize, {
      color: "red",
    });
  },

  move({ current_position, direction, num_cells }, ctx) {
    // Convert current position to pixels
    const startX = current_position.x * cellSize;
    const startY = current_position.y * cellSize;

    let endX, endY;

    // Determine the end coordinates based on the direction and number of cells
    switch (direction) {
      case "up":
        endX = startX;
        endY = startY - num_cells * cellSize;
        break;
      case "right":
        endX = startX + num_cells * cellSize;
        endY = startY;
        break;
      case "down":
        endX = startX;
        endY = startY + num_cells * cellSize;
        break;
      case "left":
        endX = startX - num_cells * cellSize;
        endY = startY;
        break;
      default:
        console.error("Invalid direction");
        return;
    }

    this.drawLine(
      ctx,
      { startX, startY, endX, endY },
      { width: 5, color: "red" }
    );
    this.drawDot(ctx, endX, endY, "red");

    // reset to default style
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
  },
};
