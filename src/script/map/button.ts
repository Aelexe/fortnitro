import { Rectangle } from "./rectangle";
import { map } from "./map";

export class Button {
	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private image: HTMLImageElement;

	private _isHidden: boolean;

	constructor(x: number, y: number, width: number, height: number, image: HTMLImageElement) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.image = image;
	}

	public getX() {
		return this.x;
	}

	public setX(x: number): void {
		this.x = x;
	}

	public getY() {
		return this.y;
	}

	public setY(y: number): void {
		this.y = y;
	}

	public getWidth() {
		return this.width;
	}

	public getHeight() {
		return this.height;
	}

	public setPosition(x: number, y: number): void {
		this.setX(x);
		this.setY(y);
	}

	public getBounds(): Rectangle {
		// TODO: Cache for mild performance increase.
		return new Rectangle(this.x, this.y, this.width, this.height);
	}

	public isHidden(): boolean {
		return this._isHidden;
	}

	public hide(): void {
		this._isHidden = true;
		map.triggerUpdate();
	}

	public show(): void {
		this._isHidden = false;
		map.triggerUpdate();
	}

	public draw(context: CanvasRenderingContext2D) {
		if (!this.isHidden()) {
			context.drawImage(this.image, this.x, this.y, this.width, this.height);
		}
	}
}
