import { CameraManager } from "./camera";
import { Player } from "./player";
import { Wall } from "./wall";

export class GameClient {
  private ctx: CanvasRenderingContext2D;
  private canvasWidth: number = 1280;
  private canvasHeight: number = 800;
  private players: Player[];
  private walls: Wall[];
  private cameraManager: CameraManager;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;

    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    // this.cameraManager = new CameraManager();

    this.players = [
      new Player({ x: 64, y: this.canvasHeight - 64 - 64 }, "red"),
      //   new Player({ x: 64 * 3, y: this.canvasHeight - 64 }, "green"),
    ];
    this.walls = [
      new Wall({ x: 0, y: 0 }, { width: 64, height: this.canvasHeight }),
      new Wall(
        { x: 0, y: this.canvasHeight - 64 },
        { width: 64 * 20, height: 64 }
      ),
      new Wall({ x: 64 * 20, y: 0 }, { width: 64, height: this.canvasHeight }),
      new Wall(
        { x: 64 * 15, y: this.canvasHeight - 128 },
        { width: 64, height: 64 }
      ),
    ];
    this.cameraManager = new CameraManager(
      this.canvasWidth,
      this.canvasHeight,
      64 * 100,
      800
    );

    this.startRenderLoop();
  }

  private startRenderLoop() {
    const render = () => {
      this.update();
      this.render();
      requestAnimationFrame(render);
    };

    render();
  }

  private render() {
    this.clearCanvas();

    this.walls.forEach((wall) =>
      wall.render(this.ctx, this.cameraManager.position)
    );
    this.players.forEach((player) =>
      player.render(this.ctx, this.cameraManager.position)
    );
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  private update() {
    this.players.forEach((player) =>
      player.update(this.ctx, this.walls, this.cameraManager.position)
    );
    this.cameraManager.update(this.players[0]);
  }
}
