export class Player {
  public x: number;
  public y: number;
  private width: number = 64;
  private height: number = 64;
  private tilesheet = new Image();
  private health: number = 100;

  constructor() {
    this.tilesheet.src = "SpriteSheet.png";
    this.tilesheet.onload = () => {};

    // set player coordinates
    this.x = Math.floor(Math.random() * 10) * 64;
    this.y = Math.floor(Math.random() * 10) * 64;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  update(dx: number, dy: number, mapWidth: number, mapHeight: number) {
    const newX = this.x + dx * this.width;
    const newY = this.y + dy * this.height;
    if (newX >= 0 && newX < mapWidth && newY >= 0 && newY < mapHeight) {
      this.x = newX;
      this.y = newY;
    } else {
      this.health -= 10;
    }
  }

  private drawHealthBar(ctx: CanvasRenderingContext2D) {
    const barWidth = this.width;
    const barHeight = 10;
    const radius = 5; // Border radius
    // Calculate the position of the health bar
    let barX = this.x;
    let barY = this.y - barHeight - 5; // Position the bar above the player

    // If the health bar is too close to the top, render it below the player
    if (barY < 0) {
      barY = this.y + this.height + 5;
    }

    // Draw the red healthbar with border radius
    ctx.fillStyle = "#ff1744";
    ctx.beginPath();
    ctx.moveTo(barX + radius, barY);
    ctx.lineTo(barX + barWidth - radius, barY);
    ctx.arcTo(barX + barWidth, barY, barX + barWidth, barY + radius, radius);
    ctx.lineTo(barX + barWidth, barY + barHeight - radius);
    ctx.arcTo(
      barX + barWidth,
      barY + barHeight,
      barX + barWidth - radius,
      barY + barHeight,
      radius
    );
    ctx.lineTo(barX + radius, barY + barHeight);
    ctx.arcTo(barX, barY + barHeight, barX, barY + barHeight - radius, radius);
    ctx.lineTo(barX, barY + radius);
    ctx.arcTo(barX, barY, barX + radius, barY, radius);
    ctx.closePath();
    ctx.fill();

    // Draw the green healthbar with border radius
    const healthWidth = this.health >= 0 ? (this.health / 100) * barWidth : 0;
    ctx.fillStyle = "#76ff03";
    ctx.beginPath();
    ctx.moveTo(barX + radius, barY);
    ctx.lineTo(barX + healthWidth - radius, barY);
    ctx.arcTo(
      barX + healthWidth,
      barY,
      barX + healthWidth,
      barY + radius,
      radius
    );
    ctx.lineTo(barX + healthWidth, barY + barHeight - radius);
    ctx.arcTo(
      barX + healthWidth,
      barY + barHeight,
      barX + healthWidth - radius,
      barY + barHeight,
      radius
    );
    ctx.lineTo(barX + radius, barY + barHeight);
    ctx.arcTo(barX, barY + barHeight, barX, barY + barHeight - radius, radius);
    ctx.lineTo(barX, barY + radius);
    ctx.arcTo(barX, barY, barX + radius, barY, radius);
    ctx.closePath();
    ctx.fill();

    // Draw the border with border radius
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(barX + radius, barY);
    ctx.lineTo(barX + barWidth - radius, barY);
    ctx.arcTo(barX + barWidth, barY, barX + barWidth, barY + radius, radius);
    ctx.lineTo(barX + barWidth, barY + barHeight - radius);
    ctx.arcTo(
      barX + barWidth,
      barY + barHeight,
      barX + barWidth - radius,
      barY + barHeight,
      radius
    );
    ctx.lineTo(barX + radius, barY + barHeight);
    ctx.arcTo(barX, barY + barHeight, barX, barY + barHeight - radius, radius);
    ctx.lineTo(barX, barY + radius);
    ctx.arcTo(barX, barY, barX + radius, barY, radius);
    ctx.closePath();
    ctx.stroke();
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.tilesheet,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.drawHealthBar(ctx);
  }
}
