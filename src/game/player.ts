import { IPosition } from "../types/position";
import { Wall } from "./wall";

const GRAVITY = 1;
export class Player {
  private width: number = 64;
  private height: number = 64;
  public position: IPosition;
  private color: string;
  private velocity = { x: 0, y: 0 };
  private keys = {
    left: { pressed: false },
    right: { pressed: false },
  };
  private isJumping = false;

  constructor(position: IPosition, color: string) {
    this.position = position;
    this.color = color;

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          if (!this.isJumping) {
            this.velocity.y -= 30;
            this.isJumping = true;
          }
          break;
        case "s":
        case "ArrowDown":
          break;
        case "a":
        case "ArrowLeft":
          this.keys.left.pressed = true;
          break;
        case "d":
        case "ArrowRight":
          this.keys.right.pressed = true;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          this.velocity.y -= 0;
          break;
        case "s":
        case "ArrowDown":
          break;
        case "a":
        case "ArrowLeft":
          this.keys.left.pressed = false;
          break;
        case "d":
        case "ArrowRight":
          this.keys.right.pressed = false;
          break;
      }
    });
  }

  update(ctx: CanvasRenderingContext2D, walls: Wall[]) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y < ctx.canvas.height) {
      this.velocity.y += GRAVITY;
    } else {
      this.isJumping = false;
      this.velocity.y = 0;
    }

    if (this.keys.right.pressed) {
      this.velocity.x = 5;
    } else if (this.keys.left.pressed) {
      this.velocity.x = -5;
    } else {
      this.velocity.x = 0;
    }

    walls.forEach((wall) => {
      if (
        this.position.y + this.height <= wall.position.y &&
        this.position.y + this.height + this.velocity.y >= wall.position.y &&
        this.position.x + this.width >= wall.position.x &&
        this.position.x <= wall.position.x + wall.dimension.width
      ) {
        this.isJumping = false;
        this.velocity.y = 0;
        this.position.y = wall.position.y - this.height;
      }

      if (
        this.position.x + this.width + this.velocity.x > wall.position.x &&
        this.position.x + this.velocity.x <
          wall.position.x + wall.dimension.width &&
        this.position.y + this.height > wall.position.y &&
        this.position.y < wall.position.y + wall.dimension.height
      ) {
        this.velocity.x = 0;
        if (this.keys.right.pressed) {
          this.position.x = wall.position.x - this.width;
        } else if (this.keys.left.pressed) {
          this.position.x = wall.position.x + wall.dimension.width;
        }
      }
    });
  }

  render(ctx: CanvasRenderingContext2D, cameraPosition: IPosition) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x - cameraPosition.x,
      this.position.y - cameraPosition.y,
      this.width,
      this.height
    );
  }
}
