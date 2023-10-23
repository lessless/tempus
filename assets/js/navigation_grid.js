const gridSize = 11; // 11x11 grid
const cellSize = 40; // Each cell is 40x40 pixels

export const NavigationGrid = {
  mounted() {
    const canvas = this.el;
    const ctx = canvas.getContext("2d");

    this.setCanvasDimensions(canvas, gridSize, cellSize);
    this.drawGrid(ctx, gridSize, cellSize);

    this.handleEvent("move", (obj) => {
      this.move(obj, ctx);
    });
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

  drawDot(ctx, x, y) {
    const dotRadius = 5;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "black";
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

    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    this.drawLine(ctx, startX, startY, endX, endY);
    this.drawDot(ctx, endX, endY);

    // reset to default style
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
  },
};
