import { Button } from "./button";
import { CameraManager } from "./camera";
import { Player } from "./player";
import { Wall } from "./wall";
import { WebSocketManager } from "./websocket";

export class GameClient {
  private ctx: CanvasRenderingContext2D;
  private canvasWidth: number = 1280;
  private canvasHeight: number = 800;
  private worldWidth: number = 6400;
  private worldHeight: number = 800;
  private debugMode: boolean = false;
  private players: Player[];
  private walls: Wall[];
  private buttons: Button[];
  private cameraManager: CameraManager;
  private webSocketManager: WebSocketManager;
  private whichPlayer: string = "";

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;

    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Tab":
          this.debugMode = !this.debugMode;
          break;
      }
    });

    this.players = [];
    this.walls = [
      new Wall({ x: 0, y: 0 }, { width: 64, height: this.canvasHeight }),
      new Wall(
        { x: 0, y: this.canvasHeight - 64 },
        { width: 64 * 25, height: 64 }
      ),
      new Wall(
        { x: 64 * 27, y: this.canvasHeight - 64 },
        { width: 64 * 16, height: 64 }
      ),
      new Wall(
        { x: 64 * 40, y: this.canvasHeight - 64 * 2 },
        { width: 64 * 3, height: 64 }
      ),
      new Wall(
        { x: 64 * 41, y: this.canvasHeight - 64 * 3 },
        { width: 64 * 2, height: 64 }
      ),
      new Wall(
        { x: 64 * 47, y: this.canvasHeight - 64 },
        { width: 64 * 13, height: 64 }
      ),
      new Wall({ x: 64 * 60, y: 0 }, { width: 64, height: this.canvasHeight }),
    ];
    this.buttons = [
      new Button({ x: 64 * 51, y: this.canvasHeight - 64 - 32 }, [
        new Wall(
          { x: 64 * 43, y: this.canvasHeight - 64 },
          { width: 64 * 5, height: 64 }
        ),
      ]),
    ];
    this.cameraManager = new CameraManager(
      this.canvasWidth,
      this.canvasHeight,
      this.worldWidth,
      this.worldHeight
    );
    this.webSocketManager = new WebSocketManager(this.handleWebSocketMessage);

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
      wall.render(this.ctx, this.cameraManager.position, this.debugMode)
    );
    this.buttons.forEach((button) =>
      button.render(this.ctx, this.cameraManager.position, this.debugMode)
    );
    this.players.forEach((player) =>
      player.render(this.ctx, this.cameraManager.position)
    );
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  private update() {
    if (this.players.length === 0) {
      return;
    }
    this.players[0].update(this.ctx, this.walls, this.buttons, this.players[1]);
    // this.players.forEach((player) => player.update(this.ctx, this.walls, this.players[1]));
    this.buttons.forEach((button) => button.update(this.players));
    this.cameraManager.update(this.players[0]);

    if (this.webSocketManager.connected) {
      this.webSocketManager.send({
        msgType: "coordinates",
        payload: { ...this.players[0].position, player: this.whichPlayer },
      });
    }
  }

  private handleWebSocketMessage = (data: any) => {
    console.log(data);
    if (data.msgType === "init") {
      this.whichPlayer = data.payload.player;
      this.players.push(
        new Player({ x: data.payload.x, y: data.payload.y }, "red", true)
        // FOR DEVELOPMENT USE
        // new Player({ x: 64 * 50, y: data.payload.y }, "red", true)
      );
    }

    if (data.msgType === "coordinates") {
      if (this.players.length === 1) {
        this.players.push(
          new Player({ x: data.payload.x, y: data.payload.y }, "green", false)
        );
      }
      this.players[1].position = { x: data.payload.x, y: data.payload.y };
    }
  };
}
