import { IDimension, IPosition } from "../types/position";
import { Player } from "./player";

export class Elevator {
  public position: IPosition;
  public originalPosition: IPosition;
  public dimension: IDimension;
  public playersNeededToMove: number;
  public numOfPlayerStanding: number;

  constructor(
    position: IPosition,
    dimension: IDimension,
    playersNeededToMove: number
  ) {
    this.position = position;
    this.originalPosition = { ...position };
    this.dimension = dimension;
    this.playersNeededToMove = playersNeededToMove;
    this.numOfPlayerStanding = 0;
  }

  render(ctx: CanvasRenderingContext2D, cameraPosition: IPosition) {
    ctx.fillStyle = "brown";
    ctx.fillRect(
      this.position.x - cameraPosition.x,
      this.position.y - cameraPosition.y,
      this.dimension.width,
      this.dimension.height
    );

    // Render the box with the number
    const boxWidth = 80;
    const boxHeight = 40;
    const boxX =
      this.position.x -
      cameraPosition.x +
      (this.dimension.width - boxWidth) / 2;
    const boxY = this.position.y - cameraPosition.y - boxHeight - 10;

    ctx.fillStyle = "white";
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    ctx.strokeStyle = "black";
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      (this.playersNeededToMove - this.numOfPlayerStanding).toString(),
      boxX + boxWidth / 2,
      boxY + boxHeight / 2
    );
  }

  update(players: Player[]) {
    this.numOfPlayerStanding = 0;
    players.forEach((player) => {
      if (
        player.position.x + player.width > this.position.x &&
        player.position.x < this.position.x + this.dimension.width &&
        player.position.y + player.height >= this.position.y &&
        player.position.y < this.position.y + this.dimension.height
      ) {
        this.numOfPlayerStanding++;
      }
    });

    if (this.numOfPlayerStanding === this.playersNeededToMove) {
      this.moveUp(players);
    } else {
      this.moveDown();
    }
  }

  private moveUp(players: Player[]) {
    const moveDistance = 2;
    this.position.y -= moveDistance;

    players.forEach((player) => {
      if (
        player.movable &&
        player.position.x + player.width > this.position.x &&
        player.position.x < this.position.x + this.dimension.width &&
        player.position.y + player.height >= this.position.y &&
        player.position.y < this.position.y + this.dimension.height
      ) {
        player.position.y -= moveDistance;
      }
    });
  }

  private moveDown() {
    const moveDistance = 2;
    if (this.position.y + moveDistance <= this.originalPosition.y) {
      this.position.y += moveDistance;
    }
  }
}
