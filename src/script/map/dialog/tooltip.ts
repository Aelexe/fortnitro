import { map } from "../map";

const TILE_SIZE: number = 32;

export class Tooltip {
	private x: number;
	private y: number;
	private width: number;
	private height: number;

	private topLeft: HTMLImageElement = new Image();
	private top: HTMLImageElement = new Image();
	private topRight: HTMLImageElement = new Image();
	private left: HTMLImageElement = new Image();
	private center: HTMLImageElement = new Image();
	private right: HTMLImageElement = new Image();
	private bottomLeft: HTMLImageElement = new Image();
	private bottom: HTMLImageElement = new Image();
	private bottomRight: HTMLImageElement = new Image();

	private isHidden: boolean;

	private text: string = "Dance under a Streetlight Spotlight";

	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.setWidth(width);
		this.setHeight(height);

		this.topLeft.src = "img/topleft.png";
		this.top.src = "img/top.png";
		this.topRight.src = "img/topright.png";
		this.left.src = "img/left.png";
		this.center.src = "img/center.png";
		this.right.src = "img/right.png";
		this.bottomLeft.src = "img/bottomleft.png";
		this.bottom.src = "img/bottom.png";
		this.bottomRight.src = "img/bottomright.png";
	}

	public setX(x: number) {
		this.x = x;
	}

	public setY(y: number) {
		this.y = y;
	}

	public setPosition(x: number, y: number) {
		this.setX(x);
		this.setY(y);
	}

	public setWidth(width: number) {
		if (width < TILE_SIZE * 2) {
			this.width = TILE_SIZE * 2;
		} else {
			this.width = width;
		}
	}

	public setHeight(height: number) {
		if (height < TILE_SIZE * 2) {
			this.height = TILE_SIZE * 2;
		} else {
			this.height = height;
		}
	}

	public hide(): void {
		this.isHidden = true;
		map.triggerUpdate();
	}

	public show(): void {
		this.isHidden = false;
		map.triggerUpdate();
	}

	public draw(context: CanvasRenderingContext2D) {
		if (this.isHidden) {
			return;
		}

		// Corners
		context.drawImage(this.topLeft, this.x, this.y, TILE_SIZE, TILE_SIZE);
		context.drawImage(this.topRight, this.x + this.width - TILE_SIZE, this.y, TILE_SIZE, TILE_SIZE);
		context.drawImage(this.bottomLeft, this.x, this.y + this.height - TILE_SIZE, TILE_SIZE, TILE_SIZE);
		context.drawImage(
			this.bottomRight,
			this.x + this.width - TILE_SIZE,
			this.y + this.height - TILE_SIZE,
			TILE_SIZE,
			TILE_SIZE
		);

		// Borders
		context.drawImage(this.top, this.x + TILE_SIZE, this.y, this.width - TILE_SIZE * 2, TILE_SIZE);
		context.drawImage(
			this.bottom,
			this.x + TILE_SIZE,
			this.y + this.height - TILE_SIZE,
			this.width - TILE_SIZE * 2,
			TILE_SIZE
		);
		context.drawImage(this.left, this.x, this.y + TILE_SIZE, TILE_SIZE, this.height - TILE_SIZE * 2);
		context.drawImage(
			this.right,
			this.x + this.width - TILE_SIZE,
			this.y + TILE_SIZE,
			TILE_SIZE,
			this.height - TILE_SIZE * 2
		);

		// Center
		context.drawImage(
			this.center,
			this.x + TILE_SIZE,
			this.y + TILE_SIZE,
			this.width - TILE_SIZE * 2,
			this.height - TILE_SIZE * 2
		);

		const textXOffset = 12;
		const textYOffset = 14 - 2 + 12;
		const shadowOffset = 2;

		context.font = "14px Open Sans";
		context.fillStyle = "black";
		context.fillText(this.text, this.x + textXOffset - shadowOffset, this.y + textYOffset);
		context.fillText(this.text, this.x + textXOffset + shadowOffset, this.y + textYOffset);
		context.fillText(this.text, this.x + textXOffset, this.y + textYOffset + shadowOffset);
		context.fillText(this.text, this.x + textXOffset, this.y + textYOffset - shadowOffset);
		context.fillStyle = "white";
		context.fillText(this.text, this.x + textXOffset, this.y + textYOffset);
	}
}