export default class Canvas {
  static #positionMarkerRadius = 12;

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

  static positionMarker(ctx, x, y, number, opts = {}) {
    const { color = "red" } = opts;
    const originalSettings = { fillStyle: ctx.fillStyle, font: ctx.font };

    this.drawDot(ctx, x, y, { color, radius: this.#positionMarkerRadius });
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

  static drawArrowBetween(
    ctx,
    { startX, startY, direction, destination },
    opts = {}
  ) {
    let endX, endY;
    const offset = this.#positionMarkerRadius / 2;
    switch (direction) {
      case "up":
        endX = startX;
        startY -= offset;
        endY = startY - destination + offset * 2;
        break;
      case "right":
        startX += offset;
        endX = startX + destination - offset * 2;
        endY = startY;
        break;
      case "down":
        endX = startX;
        startY += offset;
        endY = startY + destination - offset * 2;
        break;
      case "left":
        startX -= offset;
        endX = startX - destination + offset * 2;
        endY = startY;
        break;
      default:
        console.error("Invalid direction");
        return;
    }
    this.drawLine(ctx, { startX, startY, endX, endY }, opts);
  }
}
