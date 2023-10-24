export default class Canvas {
  constructor(ctx) {
    this.ctx = ctx;
    this.positionMarkerRadius = 12;
  }

  withContextSettings(settings, action) {
    const originalSettings = {};
    Object.keys(settings).forEach((key) => {
      originalSettings[key] = this.ctx[key];
      this.ctx[key] = settings[key];
    });
    action();
    Object.assign(this.ctx, originalSettings);
  }

  drawLine({ startX, startY, endX, endY }, opts = {}) {
    this.withContextSettings(
      { strokeStyle: opts.color, lineWidth: opts.width },
      () => {
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
      }
    );
  }

  positionMarker(x, y, number, opts = {}) {
    const { color = "red" } = opts;

    this.drawDot(x, y, { color, radius: this.positionMarkerRadius });
    this.drawText(x - 5, y + 6, number, { fontSize: 16 });
  }

  drawDot(x, y, opts = {}) {
    const { color = "black", radius = 5 } = opts;

    this.withContextSettings({ fillStyle: color }, () => {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fill();
    });
  }

  drawText(x, y, text, opts = {}) {
    const { color = "black", fontSize = 16 } = opts;
    const fontSetting = `${fontSize}px Arial`;

    this.withContextSettings({ fillStyle: color, font: fontSetting }, () => {
      this.ctx.fillText(text, x, y);
    });
  }

  lineWithMarker(
    { startX, startY, direction, destination, moveCount },
    opts = {}
  ) {
    let endX, endY;
    const originalStartX = startX;
    const originalStartY = startY;

    switch (direction) {
      case "up":
        endX = originalStartX;
        endY = originalStartY - destination;
        startY = originalStartY - this.positionMarkerRadius;
        break;
      case "right":
        endX = originalStartX + destination;
        endY = originalStartY;
        startX = originalStartX + this.positionMarkerRadius;
        break;
      case "down":
        endX = originalStartX;
        endY = originalStartY + destination;
        startY = originalStartY + this.positionMarkerRadius;
        break;
      case "left":
        endX = originalStartX - destination;
        endY = originalStartY;
        startX = originalStartX - this.positionMarkerRadius;
        break;
      default:
        console.error("Invalid direction");
        return;
    }
    this.drawLine({ startX, startY, endX, endY }, opts);
    this.positionMarker(endX, endY, moveCount, opts);
  }
}
