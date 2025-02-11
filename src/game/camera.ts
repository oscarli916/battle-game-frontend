import { IPosition } from "../types/position";
import { Player } from "./player";

export class CameraManager {
  public position: IPosition;
  public canvasWidth: number;
  public canvasHeight: number;
  public worldWidth: number;
  public worldHeight: number;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    worldWidth: number,
    worldHeight: number
  ) {
    this.position = { x: 0, y: 0 };
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
  }

  update(player: Player) {
    const halfCanvasWidth = this.canvasWidth / 2;

    // update camera position based on player position
    if (player.position.x > this.position.x + halfCanvasWidth) {
      this.position.x = player.position.x - halfCanvasWidth;
    } else if (player.position.x < this.position.x + halfCanvasWidth) {
      this.position.x = player.position.x - halfCanvasWidth;
    }

    // ensure the camera does not go out of the world
    if (player.position.x < halfCanvasWidth) {
      this.position.x = 0;
    }
  }
}
