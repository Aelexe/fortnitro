import { Rectangle } from "../rectangle";
import { Hoverable } from "../hoverable";
import { map } from "../map";

const tick: HTMLImageElement = new Image();
tick.src = "img/tick.png";

const cross: HTMLImageElement = new Image();
cross.src = "img/cross.png";

export class Button implements Hoverable {
	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private image: HTMLImageElement;

	private isHovered: boolean = false;

	constructor(x, y, width, height, type) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		if (type === "tick") {
			this.image = tick;
		} else if (type === "cross") {
			this.image = cross;
		}
	}

	public getBounds(): Rectangle {
		// TODO: Cache for mild performance increase.
		return new Rectangle(this.x, this.y, this.width, this.height);
	}

	public hover(): void {
		map.addHoveredElement(this);
	}

	public unhover(): void {
		this.isHovered = false;
	}

	public click(x: number, y: number) {
		return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
	}

	public draw(context: CanvasRenderingContext2D, parentX: number, parentY: number) {
		context.drawImage(this.image, this.x + parentX, this.y + parentY, this.width, this.height);
	}
}
