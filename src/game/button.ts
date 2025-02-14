import { IPosition } from "../types/position";
import { Player } from "./player";
import { Wall } from "./wall";

export class Button {
  public position: IPosition;
  private width: number = 64;
  private height: number = 32;
  public pressed: boolean;
  public walls: Wall[];

  constructor(position: IPosition, walls: Wall[]) {
    this.position = position;
    this.pressed = false;
    this.walls = walls;
  }

  render(
    ctx: CanvasRenderingContext2D,
    cameraPosition: IPosition,
    debugMode: boolean
  ) {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      this.position.x - cameraPosition.x,
      this.position.y - cameraPosition.y,
      this.width,
      this.height
    );

    if (this.pressed) {
      this.walls.forEach((wall) => {
        wall.render(ctx, cameraPosition, debugMode);
      });
    }
  }

  update(players: Player[]) {
    const pressed = players.some(
      (player) =>
        player.position.x < this.position.x + this.width &&
        player.position.x + player.width > this.position.x &&
        player.position.y < this.position.y + this.height &&
        player.position.y + player.height > this.position.y
    );
    if (pressed) {
      this.pressed = pressed;
    }
  }
}
