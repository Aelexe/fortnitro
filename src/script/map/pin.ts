import { map } from "./map";

import { saveData } from "data/save-data";

const pinMap = {
	streetLight: "speakerpin",
	star: "starpin",
	glider: "umbrellapin",
	target: "targetpin",
	kill: "skullpin",
	timeTrial: "timerpin",
	chest: "chestpin",
	apple: "applepin",
	hoop: "hooppin",
	speed: "speedpin",
	question: "questionpin"
};

const imageMap = {};

export class Pin {
	private static readonly DEFAULT_SCALE: number = 1;
	private static readonly HIDDEN_SCALE: number = 0;
	private static readonly HOVER_SCALE: number = 1.5;

	private id: string;
	private rootX: number;
	private rootY: number;
	private _x: number;
	private _y: number;
	private targetX: number;
	private targetY: number;
	private width: number;
	private height: number;
	private _scale: number = 1;
	private targetScale: number = 1;
	private image: HTMLImageElement;

	private isComplete: boolean = false;
	private _visible: boolean = true;
	private _hovered: boolean = false;

	private listeners = [];

	private linkedPins: Pin[] = [];

	constructor(id: string, x: number, y: number, imageType?: string) {
		this.id = id;
		this.rootX = x;
		this.rootY = y;
		this._x = x;
		this._y = y;
		this.targetX = x;
		this.targetY = y;

		if (imageType === undefined || pinMap[imageType] === undefined) {
			imageType = "question";
		}

		if (imageMap[imageType] === undefined) {
			const pinImage = new Image();
			pinImage.src = "img/" + pinMap[imageType] + ".png";
			imageMap[imageType] = pinImage;
		}

		const image = imageMap[imageType];

		if (image.complete || image.naturalWidth > 0) {
			this.setImage(image);
		} else {
			image.addEventListener("load", () => {
				this.setImage(image);
			});
		}
	}

	public setImage(image: HTMLImageElement): void {
		this.image = image;
		this.width = this.image.width * 2;
		this.height = this.image.height * 2;
	}

	public getId(): string {
		return this.id;
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	public offsetX(offset: number) {
		this.targetX = this.rootX + offset;
	}

	public offsetT(offset: number) {
		this.targetY = this.rootY + offset;
	}

	public getWidth() {
		return this.width;
	}

	public getHeight() {
		return this.height;
	}

	set scale(scale: number) {
		this._scale = scale;
		this.targetScale = scale;
	}

	get visible() {
		return this._visible;
	}

	public show() {
		this._visible = true;
		this.updateState();
		map.triggerUpdate();

		this.linkedPins.forEach((linkedPin) => {
			linkedPin.show();
		});
	}

	public hide() {
		this._visible = false;
		this.updateState();
		map.triggerUpdate();

		this.linkedPins.forEach((linkedPin) => {
			linkedPin.hide();
		});
	}

	public hover() {
		if (!this._hovered) {
			this._hovered = true;
			this.updateState();
			map.triggerUpdate();

			this.linkedPins.forEach((linkedPin) => {
				linkedPin.hover();
			});

			this.emit("hover");
		}
	}

	public unhover() {
		this._hovered = false;
		this.updateState();
		map.triggerUpdate();

		this.linkedPins.forEach((linkedPin) => {
			linkedPin.unhover();
		});
	}

	private updateState() {
		if (this._visible) {
			if (this._hovered) {
				this.targetScale = Pin.HOVER_SCALE;
			} else {
				this.targetScale = Pin.DEFAULT_SCALE;
			}
		} else {
			this.targetScale = Pin.HIDDEN_SCALE;
		}
	}

	public addListener(listener) {
		this.listeners.push(listener);
	}

	private emit(event: string): void {
		this.listeners.forEach((listener) => {
			listener(this, event);
		});
	}

	public addLinkedPin(linkedPin) {
		this.linkedPins.push(linkedPin);

		linkedPin.addListener((pin, status) => {
			if (status === "hover") {
				this.hover();
			} else if (status === "complete") {
				this.complete();
			} else if (status === "reset") {
				this.reset();
			}
		});
	}

	public complete() {
		if (!this.isComplete) {
			this.isComplete = true;
			saveData.setPinCompletion(this.id, true);
			this.hide();
			this.emit("complete");
		}
	}

	public reset() {
		if (this.isComplete) {
			this.isComplete = false;
			saveData.setPinCompletion(this.id, false);
			this.show();

			this.linkedPins.forEach((linkedPin) => {
				linkedPin.reset();
			});

			this.emit("reset");
		}
	}

	public getCanvasPosition(x: number, y: number, zoom: number) {
		return {
			x: x + this._x * zoom - (this.width * this._scale) / 2,
			y: y + this._y * zoom - this.height * this._scale
		};
	}

	public getCanvasBounds(x: number, y: number, zoom: number) {
		return {
			x: x + this._x * zoom - (this.width * this._scale) / 2,
			y: y + this._y * zoom - this.height * this._scale,
			width: this.width * this._scale,
			height: this.height * this._scale
		};
	}

	public update() {
		this._x += (this.targetX - this._x) * 0.2;
		this._y += (this.targetY - this._y) * 0.2;
		this._scale += (this.targetScale - this._scale) * 0.2;

		if (Math.abs(this._x - this.targetX) < 0.01) {
			this._x = this.targetX;
		} else {
			map.triggerUpdate();
		}
		if (Math.abs(this._y - this.targetY) < 0.01) {
			this._y = this.targetY;
		} else {
			map.triggerUpdate();
		}
		if (Math.abs(this._scale - this.targetScale) < 0.01) {
			this._scale = this.targetScale;
		} else {
			map.triggerUpdate();
		}

		if (Math.abs(this._scale - this.targetScale) < 0.01) {
			this._scale = this.targetScale;
		} else {
			map.triggerUpdate();
		}
	}

	public draw(context: CanvasRenderingContext2D, x: number, y: number, zoom: number) {
		if (this.image === undefined) {
			return;
		}

		if (this._visible || this._scale !== 0) {
			const position = this.getCanvasPosition(x, y, zoom);
			const drawWidth = this.width * this._scale;
			const drawHeight = this.height * this._scale;

			context.drawImage(this.image, position.x, position.y, drawWidth, drawHeight);
		}
	}
}
