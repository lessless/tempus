export default class Canvas {
  static drawGrid(ctx, gridSize, cellSize) {
    for (let i = 0; i <= gridSize; i++) {
      this.drawLine(ctx, {
        startX: i * cellSize,
        startY: 0,
        endX: i * cellSize,
        endY: gridSize * cellSize,
      }); // Vertical line
      this.drawLine(ctx, {
        startX: 0,
        startY: i * cellSize,
        endX: gridSize * cellSize,
        endY: i * cellSize,
      }); // Horizontal line
    }
  }

  static drawLine(ctx, { startX, startY, endX, endY }, opts = {}) {
    const { width = 1, color = "black" } = opts;
    const originalSettings = {
      strokeStyle: ctx.strokeStyle,
      lineWidth: ctx.lineWidth,
    };

    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    Object.assign(ctx, originalSettings);
  }

  static drawDot(ctx, x, y, opts = {}) {
    const { color = "black", radius = 5 } = opts;
    const originalSettings = { fillStyle: ctx.fillStyle };

    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    Object.assign(ctx, originalSettings);
  }

  static drawNumberInCircle(ctx, x, y, number, opts = {}) {
    const { color = "red" } = opts;
    const originalSettings = { fillStyle: ctx.fillStyle, font: ctx.font };

    this.drawDot(ctx, x, y, { color, radius: 12 });
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(number, x - 5, y + 6);
    Object.assign(ctx, originalSettings);
  }
}
