import { CameraManager } from "./camera";
import { Player } from "./player";
import { Wall } from "./wall";

export class GameClient {
  private ctx: CanvasRenderingContext2D;
  private canvasWidth: number = 1200;
  private canvasHeight: number = 800;
  private players: Player[];
  private walls: Wall[];
  // private cameraManager: CameraManager;

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
        { width: 64 * 10, height: 64 }
      ),
    ];

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

    // center canvas
    // const { moveX, moveY } = this.cameraManager.getTransformValues(
    // 	this.player,
    // 	this.ctx.canvas.width,
    // 	this.ctx.canvas.height
    // );
    // this.ctx.setTransform(1, 0, 0, 1, moveX, moveY);

    // const { mapTileWidth, mapTileHeight } = this.mapManager.render(
    //   this.ctx,
    //   this.ctx.canvas.width,
    //   this.ctx.canvas.height
    // );
    // this.mapTileWidth = mapTileWidth;
    // this.mapTileHeight = mapTileHeight;
    this.walls.forEach((wall) => wall.render(this.ctx));
    this.players.forEach((player) => player.render(this.ctx));
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  private update() {
    // const { width: mapWidth, height: mapHeight } =
    //   this.mapManager.getMapDimensions();
    this.players.forEach((player) => player.update(this.ctx, this.walls));
  }
}
