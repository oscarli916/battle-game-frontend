import { IDimension, IPosition } from "../types/position";

export class Wall {
  public position: IPosition;
  public dimension: IDimension;

  constructor(position: IPosition, dimension: IDimension) {
    this.position = position;
    this.dimension = dimension;
  }

  render(
    ctx: CanvasRenderingContext2D,
    cameraPosition: IPosition,
    debugMode: boolean
  ) {
    ctx.fillStyle = "brown";
    ctx.fillRect(
      this.position.x - cameraPosition.x,
      this.position.y - cameraPosition.y,
      this.dimension.width,
      this.dimension.height
    );

    if (debugMode) {
      // Draw the yellow border
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2; // You can adjust the border width if needed
      ctx.strokeRect(
        this.position.x - cameraPosition.x,
        this.position.y - cameraPosition.y,
        this.dimension.width,
        this.dimension.height
      );
    }
  }
}
