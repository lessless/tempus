export default class Canvas {
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

  static drawNumberInCircle(ctx, x, y, number, opts = {}) {
    const { color = "red" } = opts;
    const originalSettings = { fillStyle: ctx.fillStyle, font: ctx.font };

    this.drawDot(ctx, x, y, { color, radius: 12 });
    this.drawText(ctx, x - 5, y + 6, number, { fontSize: 16 });

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

  static drawText(ctx, x, y, text, opts = {}) {
    const { color = "black", fontSize = 16 } = opts;
    const originalSettings = { fillStyle: ctx.fillStyle, font: ctx.font };
    ctx.font = `${fontSize}px Arial`;

    ctx.fillText(text, x, y);
    Object.assign(ctx, originalSettings);
  }
}
