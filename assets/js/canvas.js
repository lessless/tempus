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

  drawArrowBetween(
    { startX, startY, direction, destination, moveCount },
    opts = {}
  ) {
    let endX, endY;
    const offset = this.positionMarkerRadius;
    switch (direction) {
      case "up":
        endX = startX;
        endY = startY - destination;
        break;
      case "right":
        endX = startX + destination;
        endY = startY;
        break;
      case "down":
        endX = startX;
        endY = startY + destination;
        break;
      case "left":
        endX = startX - destination;
        endY = startY;
        break;
      default:
        console.error("Invalid direction");
        return;
    }

    // Offset endX and endY for drawing the arrowhead
    const arrowheadOffsetX =
      direction === "right" ? -offset : direction === "left" ? offset : 0;
    const arrowheadOffsetY =
      direction === "down" ? -offset : direction === "up" ? offset : 0;

    // Draw the line from (startX, startY) to (endX, endY), but offset by half of positionMarkerRadius
    this.drawLine(
      {
        startX:
          startX +
          (direction === "right"
            ? offset / 2
            : direction === "left"
            ? -offset / 2
            : 0),
        startY:
          startY +
          (direction === "down"
            ? offset / 2
            : direction === "up"
            ? -offset / 2
            : 0),
        endX: endX + arrowheadOffsetX,
        endY: endY + arrowheadOffsetY,
      },
      opts
    );

    this.drawArrowhead(
      { x: endX + arrowheadOffsetX, y: endY + arrowheadOffsetY, direction },
      opts
    );

    // Draw positionMarker centered around (endX, endY)
    this.positionMarker(endX, endY, moveCount, opts);
  }

  drawArrowhead({ x, y, direction }, opts = {}) {
    const { length = 10, width = 5, color = "black" } = opts;

    let angle;
    switch (direction) {
      case "up":
        angle = -Math.PI / 2;
        break;
      case "right":
        angle = 0;
        break;
      case "down":
        angle = Math.PI / 2;
        break;
      case "left":
        angle = Math.PI;
        break;
      default:
        console.error("Invalid direction");
        return;
    }

    this.withContextSettings(
      { strokeStyle: color, fillStyle: color, lineWidth: width },
      () => {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-length, width);
        this.ctx.lineTo(-length, -width);
        this.ctx.closePath();

        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.restore();
      }
    );
  }
}
