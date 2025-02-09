import { IDimension, IPosition } from "../types/position";

export class Wall {
  public position: IPosition;
  public dimension: IDimension;

  constructor(position: IPosition, dimension: IDimension) {
    this.position = position;
    this.dimension = dimension;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "brown";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.dimension.width,
      this.dimension.height
    );
  }
}
