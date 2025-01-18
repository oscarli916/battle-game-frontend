import { CameraManager } from "./camera";
import { ControlManager } from "./control";
import { MapManager } from "./map";
import { Player } from "./player";

export class GameClient {
  private ctx: CanvasRenderingContext2D;
  private mapManager: MapManager;
  private player: Player;
  private cameraManager: CameraManager;
  private controlManager: ControlManager;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    this.mapManager = new MapManager();
    this.controlManager = new ControlManager((dx, dy) => this.update(dx, dy));
    this.cameraManager = new CameraManager();
    this.player = new Player();

    this.startRenderLoop();
  }

  private startRenderLoop() {
    const render = () => {
      this.render();
      requestAnimationFrame(render);
    };

    render();
  }

  private render() {
    this.clearCanvas();

    // center canvas
    const { moveX, moveY } = this.cameraManager.getTransformValues(
      this.player,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
    this.ctx.setTransform(1, 0, 0, 1, moveX, moveY);

    this.mapManager.render(
      this.ctx,
      -moveX,
      -moveY,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
    this.player.render(this.ctx);
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  private update(dx: number, dy: number) {
    const { width: mapWidth, height: mapHeight } =
      this.mapManager.getMapDimensions();
    this.player.update(dx, dy, mapWidth, mapHeight);
  }
}
