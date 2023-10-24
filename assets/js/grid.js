import Canvas from "./canvas.js";

export default class Grid {
  constructor(el, gridSize, cellSize) {
    this.gridSize = gridSize; // 11x11 grid
    this.cellSize = cellSize; // Each cell is 40x40 pixels
    this.labelOffset = 10;
    this.container = el;
    this.ctx = el.getContext("2d");
    this.canvas = new Canvas(this.ctx);
    this.currentPosition;
    this.moveCount = 0;
  }

  draw() {
    this.container.height = this.container.width =
      this.gridSize * this.cellSize;
    this.drawGrid(this.ctx, this.gridSize, this.cellSize);
  }

  markStartingPoint(position) {
    this.currentPosition = position;
    this.moveCount++;

    this.canvas.positionMarker(
      position.x * this.cellSize,
      position.y * this.cellSize,
      this.moveCount,
      { color: "lightgreen" }
    );
  }

  drawGrid() {
    for (let i = 0; i <= this.gridSize; i++) {
      this.canvas.drawLine({
        startX: i * this.cellSize,
        startY: 0,
        endX: i * this.cellSize,
        endY: this.gridSize * this.cellSize,
      }); // Vertical line
      this.canvas.drawLine({
        startX: 0,
        startY: i * this.cellSize,
        endX: this.gridSize * this.cellSize,
        endY: i * this.cellSize,
      }); // Horizontal line
    }
  }

  move(updatedPosition, direction, numCells) {
    // Convert current position to pixels
    const startX = this.currentPosition.x * this.cellSize;
    const startY = this.currentPosition.y * this.cellSize;
    const destination = numCells * this.cellSize;

    this.canvas.lineWithMarker(
      { startX, startY, direction, destination, moveCount: ++this.moveCount },
      { width: 5, color: "lightgreen" }
    );
    this.currentPosition = updatedPosition;
  }
}
