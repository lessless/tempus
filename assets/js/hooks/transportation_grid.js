import Grid from "../grid.js";

export const TransportationGrid = {
  mounted() {
    const grid = new Grid(this.el, 11, 40);
    grid.draw();
    grid.markStartingPoint(JSON.parse(this.el.dataset.startingPosition));
    // this.handleEvent("move", (obj) => {
    //   this.move(obj, ctx);
    // });
  },

  //   move({ current_position, direction, num_cells }, ctx) {
  //     // Convert current position to pixels
  //     const startX = current_position.x * cellSize;
  //     const startY = current_position.y * cellSize;
  //
  //     let endX, endY;
  //
  //     // Determine the end coordinates based on the direction and number of cells
  //     switch (direction) {
  //       case "up":
  //         endX = startX;
  //         endY = startY - num_cells * cellSize;
  //         break;
  //       case "right":
  //         endX = startX + num_cells * cellSize;
  //         endY = startY;
  //         break;
  //       case "down":
  //         endX = startX;
  //         endY = startY + num_cells * cellSize;
  //         break;
  //       case "left":
  //         endX = startX - num_cells * cellSize;
  //         endY = startY;
  //         break;
  //       default:
  //         console.error("Invalid direction");
  //         return;
  //     }
  //
  //     Canvas.drawLine(
  //       ctx,
  //       { startX, startY, endX, endY },
  //       { width: 5, color: "aquamarine" }
  //     );
  //     Canvas.drawDot(ctx, endX, endY, "red");
  //
  //     // reset to default style
  //     ctx.lineWidth = 1;
  //     ctx.strokeStyle = "black";
  //   },
};
