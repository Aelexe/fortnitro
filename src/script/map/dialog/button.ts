const tick: HTMLImageElement = new Image();
tick.src = "img/tick.png";

const tickHover: HTMLImageElement = new Image();
tickHover.src = "img/tick-hover.png";

const tickPress: HTMLImageElement = new Image();
tickPress.src = "img/tick-press.png";

const cross: HTMLImageElement = new Image();
cross.src = "img/cross.png";

export class Button {
	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private image: HTMLImageElement;
	private hoverImage: HTMLImageElement;

	private isHovered: boolean = false;

	constructor(x, y, width, height, type) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		if (type === "tick") {
			this.image = tick;
			this.hoverImage = tickHover;
		} else if (type === "cross") {
			this.image = cross;
			this.hoverImage = tickHover;
		}
	}

	public hover(x: number, y: number): boolean {
		this.isHovered = x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
		return this.isHovered;
	}

	public click(x: number, y: number) {
		return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
	}

	public draw(context: CanvasRenderingContext2D, parentX: number, parentY: number) {
		let image: HTMLImageElement = this.image;
		image = this.isHovered ? this.hoverImage : image;
		context.drawImage(image, this.x + parentX, this.y + parentY, this.width, this.height);
	}
}
