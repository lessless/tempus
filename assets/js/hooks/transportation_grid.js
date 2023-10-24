import Grid from "../grid.js";

export const TransportationGrid = {
  mounted() {
    const grid = new Grid(this.el, 11, 40);
    grid.draw();
    grid.markStartingPoint(JSON.parse(this.el.dataset.startingPosition));
    this.grid = grid;
    this.handleEvent("moved", this.moved.bind(this));
  },

  moved({ updated_position, direction, num_cells }) {
    this.grid.move(updated_position, direction, num_cells);
  },
};
