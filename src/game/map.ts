export class MapManager {
	private width: number = 128;
	private height: number = 128;
	private tilesheet = new Image();
	private colors: { [key: number]: string } = {
		0: "#fef0da",
		1: "black",
		2: "#d06d40",
	};

	public map: number[][] = [
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
		[2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
		[2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2],
	];

	constructor() {
		this.tilesheet.src = "tiles.png";
		this.tilesheet.onload = () => {};
	}

	getMapDimensions() {
		return {
			width: this.map[0].length * this.width,
			height: this.map.length * this.height,
		};
	}

	render(
		ctx: CanvasRenderingContext2D,
		// cameraX: number,
		// cameraY: number,
		canvasWidth: number,
		canvasHeight: number
	) {
		const mapWidth = this.map[0].length;
		const mapHeight = this.map.length;

		const mapTileWidth = canvasWidth / mapWidth;
		const mapTileHeight = canvasHeight / mapHeight;

		this.map.forEach((row, y) => {
			row.forEach((col, x) => {
				ctx.fillStyle = this.colors[col];
				ctx.fillRect(
					x * mapTileWidth,
					y * mapTileHeight,
					mapTileWidth,
					mapTileHeight
				);
			});
		});

		return { mapTileWidth, mapTileHeight };
		// this.map.forEach((row, y) => {
		// 	row.forEach((col, x) => {
		// 		ctx.fillStyle = this.colors[x];
		// 		ctx.fillRect(x * this.width, y * this.height, 8, 8);

		// 		// if (x === 2) {
		// 		// 	// ctx.fillStyle = "#FFFFFF";
		// 		// 	ctx.fillStyle = "red";
		// 		// 	ctx.fillRect(x * this.width, y * this.height, 8, 8);
		// 		// } else {
		// 		// 	ctx.drawImage(
		// 		// 		this.tilesheet,
		// 		// 		col * this.width,
		// 		// 		0,
		// 		// 		this.width,
		// 		// 		this.height,
		// 		// 		x * this.width,
		// 		// 		y * this.height,
		// 		// 		this.width,
		// 		// 		this.height
		// 		// 	);
		// 		// }
		// 	});
		// });
	}
}
