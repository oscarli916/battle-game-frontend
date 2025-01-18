import { MapManager } from "./map";

export class Player {
	public x: number;
	public y: number;
	private width: number = 128;
	private height: number = 128;
	private tilesheet = new Image();
	private map: MapManager;

	constructor(map: MapManager) {
		this.tilesheet.src = "pico-park/green-character.png";
		this.tilesheet.onload = () => {};

		this.map = map;

		// set player coordinates
		// this.x = Math.floor(Math.random() * 10) * 64;
		// this.y = Math.floor(Math.random() * 10) * 64;
		this.x = 1;
		this.y = this.map.map.length - 2;
	}

	getPosition() {
		return { x: this.x, y: this.y };
	}

	update(dx: number, dy: number, mapTileWidth: number, mapTileHeight: number) {
		const newX = this.x + dx;
		const newY = this.y + dy;
		if (this.map.map[newY][newX] !== 2) {
			this.x = newX;
			this.y = newY;
		}
	}

	render(
		ctx: CanvasRenderingContext2D,
		mapTileWidth: number,
		mapTileHeight: number
	) {
		ctx.drawImage(
			this.tilesheet,
			0,
			0,
			this.width,
			this.height,
			this.x * mapTileWidth,
			this.y * mapTileHeight,
			mapTileWidth,
			mapTileHeight
		);
	}
}
