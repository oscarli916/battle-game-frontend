export class ControlManager {
  private keys: { [key: string]: boolean } = {};

  constructor(callback: (x: number, y: number) => void) {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          callback(0, -1);
          break;
        case "s":
        case "ArrowDown":
          callback(0, 1);
          break;
        case "a":
        case "ArrowLeft":
          callback(-1, 0);
          break;
        case "d":
        case "ArrowRight":
          callback(1, 0);
          break;
      }
    });
  }
}
