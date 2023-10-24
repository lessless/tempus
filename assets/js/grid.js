import Canvas from "./canvas.js";

export default class Grid {
  constructor(el, gridSize, cellSize) {
    this.gridSize = gridSize; // 11x11 grid
    this.cellSize = cellSize; // Each cell is 40x40 pixels
    this.labelOffset = 10;
    this.canvas = el;
    this.ctx = el.getContext("2d");
    this.currentPosition;
  }

  draw() {
    this.canvas.height = this.canvas.width = this.gridSize * this.cellSize;
    this.drawGrid(this.ctx, this.gridSize, this.cellSize);
  }

  markStartingPoint(position) {
    this.currentPosition = position;

    Canvas.positionMarker(
      this.ctx,
      position.x * this.cellSize,
      position.y * this.cellSize,
      1,
      { color: "aquamarine" }
    );
  }

  drawGrid() {
    for (let i = 0; i <= this.gridSize; i++) {
      Canvas.drawLine(this.ctx, {
        startX: i * this.cellSize,
        startY: 0,
        endX: i * this.cellSize,
        endY: this.gridSize * this.cellSize,
      }); // Vertical line
      Canvas.drawLine(this.ctx, {
        startX: 0,
        startY: i * this.cellSize,
        endX: this.gridSize * this.cellSize,
        endY: i * this.cellSize,
      }); // Horizontal line
    }
  }

  move(direction, numCells) {
    // Convert current position to pixels
    const startX = this.currentPosition.x * this.cellSize;
    const startY = this.currentPosition.y * this.cellSize;
    const destination = numCells * this.cellSize;

    Canvas.drawArrowBetween(
      this.ctx,
      { startX, startY, direction, destination },
      { width: 5, color: "aquamarine" }
    );
  }
}
