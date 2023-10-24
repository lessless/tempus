import Canvas from "./canvas.js";

export default class Grid {
  #gridSize;
  #cellSize;
  #labelOffset = 10;
  #canvas;
  #ctx;

  constructor(el, gridSize, cellSize) {
    this.#gridSize = gridSize; // 11x11 grid
    this.#cellSize = cellSize; // Each cell is 40x40 pixels
    this.#canvas = el;
    this.#ctx = el.getContext("2d");
  }

  draw() {
    this.#canvas.height = this.#canvas.width = this.#gridSize * this.#cellSize;
    Canvas.drawGrid(this.#ctx, this.#gridSize, this.#cellSize);
  }

  markStartingPoint(position) {
    Canvas.drawNumberInCircle(
      this.#ctx,
      position.x * this.#cellSize,
      position.y * this.#cellSize,
      1,
      { color: "aquamarine" }
    );
  }
}
