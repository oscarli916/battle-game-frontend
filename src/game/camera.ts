import { Player } from "./player";

export class CameraManager {
  private x: number = 0;
  private y: number = 0;

  private lerp(start: number, end: number, t: number) {
    return start * (1 - t) + end * t;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getTransformValues(
    player: Player,
    canvasWidth: number,
    canvasHeight: number
  ) {
    const { x, y } = player.getPosition();
    const targetX = canvasWidth / 2 - x;
    const targetY = canvasHeight / 2 - y;

    // Apply lerp for smooth transition
    this.x = this.lerp(this.x, targetX, 0.1);
    this.y = this.lerp(this.y, targetY, 0.1);

    return { moveX: this.x, moveY: this.y };
    // return { moveX: targetX, moveY: targetY };
  }
}
