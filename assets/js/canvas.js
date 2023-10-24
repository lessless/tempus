export default class Canvas {
  static #positionMarkerRadius = 12;

  static withContextSettings(ctx, settings, action) {
    const originalSettings = {};

    Object.keys(settings).forEach((key) => {
      originalSettings[key] = ctx[key];
      ctx[key] = settings[key];
    });

    action();
    Object.assign(ctx, originalSettings);
  }

  static drawLine(ctx, { startX, startY, endX, endY }, opts = {}) {
    this.withContextSettings(
      ctx,
      { strokeStyle: opts.color, lineWidth: opts.width },
      () => {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    );
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
    { startX, startY, direction, destination, moveCount },
    opts = {}
  ) {
    let endX, endY;
    const offset = this.#positionMarkerRadius;
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
      ctx,
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
      ctx,
      { x: endX + arrowheadOffsetX, y: endY + arrowheadOffsetY, direction },
      opts
    );

    // Draw positionMarker centered around (endX, endY)
    this.positionMarker(ctx, endX, endY, moveCount, opts);
  }

  static drawArrowhead(ctx, { x, y, direction }, opts = {}) {
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
      ctx,
      { strokeStyle: color, fillStyle: color, lineWidth: width },
      () => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-length, width);
        ctx.lineTo(-length, -width);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }
    );
  }
}
