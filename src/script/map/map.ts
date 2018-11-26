import { prompt } from "../tracker/prompt";

import { Pin } from "./pin";
import { Dialog } from "./dialog";
import { Tooltip } from "./dialog/tooltip";

const MAP_IMAGE_SIZE: number = 2200;
const ISOLATION_ZOOM: number = 1.4;

class Map {
	private static readonly UPDATE_TIMER = 1000 / 60;

	private _element: HTMLCanvasElement;
	private _context: CanvasRenderingContext2D;
	private image: HTMLImageElement;

	private _x: number = 0;
	private _y: number = 0;
	private targetX: number = 0;
	private targetY: number = 0;
	private _width = 900;
	private _height = 900;
	private _zoom: number = 900 / MAP_IMAGE_SIZE;
	private targetZoom: number = 900 / MAP_IMAGE_SIZE;
	private _zoomMin: number = 900 / MAP_IMAGE_SIZE;

	private shouldUpdate: boolean = false;
	private isUpdating: boolean = false;

	private _pins: Pin[] = [];
	private dialog: Dialog;
	private tooltip: Tooltip;

	public initialise(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
		this._element = canvas;
		this._context = context;
		this.dialog = new Dialog(100, 100, 176, 64);
		this.dialog.hide();
		this.tooltip = new Tooltip(0, 0, 176, 32);
		this.tooltip.hide();
		context.imageSmoothingEnabled = false;
	}

	public loadImage() {
		const minMapImage: HTMLImageElement = new Image();
		minMapImage.src = "img/map-min.jpg";
		minMapImage.onload = () => {
			if (map.getImage() === undefined) {
				map.setImage(minMapImage);
			}
		};

		const mapImage: HTMLImageElement = new Image();
		mapImage.src = "img/map.jpg";
		mapImage.onload = () => {
			map.setImage(mapImage);
		};
	}

	public getImage() {
		return this.image;
	}

	public setImage(image: HTMLImageElement) {
		this.image = image;

		this.triggerUpdate();
	}

	get x() {
		return this._x;
	}

	set x(x: number) {
		this._x = x;
		this.targetX = x;
	}

	public setSize(size: number) {
		this._element.width = size;
		this._element.height = size;
		this._width = size;
		this._height = size;
		this._zoomMin = size / MAP_IMAGE_SIZE;
		this._zoom = this._zoomMin;
		this.targetZoom = this._zoom;

		this._context.imageSmoothingEnabled = false;

		this.triggerUpdate();
	}

	public moveX(xMove: number) {
		this.targetX += xMove;

		const xMin = this._width - MAP_IMAGE_SIZE * this._zoom;
		const xMax = 0;

		if (this.targetX < xMin) {
			this.targetX = xMin;
		} else if (this.targetX > xMax) {
			this.targetX = xMax;
		}

		this.triggerUpdate();
	}

	get y() {
		return this._y;
	}

	set y(y: number) {
		this._y = y;
		this.targetY = y;
	}

	public moveY(yMove: number) {
		this.targetY += yMove;

		const yMin = this._height - MAP_IMAGE_SIZE * this._zoom;
		const yMax = 0;

		if (this.targetY < yMin) {
			this.targetY = yMin;
		} else if (this.targetY > yMax) {
			this.targetY = yMax;
		}

		this.triggerUpdate();
	}

	get zoom() {
		return this._zoom;
	}

	set zoom(zoom) {
		this._zoom = zoom;
		this.targetZoom = zoom;
	}

	public zoomIn(centerX, centerY): void {
		this.adjustZoom(this.targetZoom * 0.1, centerX, centerY);
	}

	public zoomOut(centerX, centerY): void {
		this.adjustZoom(this.targetZoom * -0.1, centerX, centerY);
	}

	public adjustZoom(zoomAdjust, centerX, centerY) {
		// Get the percentage offset of the cursor from the origin of the map.
		const xPercent = (-this._x + centerX) / (MAP_IMAGE_SIZE * this._zoom);
		const yPercent = (-this._y + centerY) / (MAP_IMAGE_SIZE * this._zoom);

		// Set target zoom.
		this.targetZoom += zoomAdjust;
		if (this.targetZoom < this._zoomMin) {
			this.targetZoom = this._zoomMin;
		}

		// Set target x/y values to keep the cursor in the same position.
		this.targetX = -xPercent * (MAP_IMAGE_SIZE * this.targetZoom) + centerX;
		this.targetY = -yPercent * (MAP_IMAGE_SIZE * this.targetZoom) + centerY;

		this.triggerUpdate();
	}

	public addPin(pin: Pin) {
		this._pins.push(pin);
		this._pins.sort((pinA: Pin, pinB: Pin) => {
			if (pinA.y < pinB.y) {
				return -1;
			} else if (pinA.y > pinB.y) {
				return 1;
			} else {
				return 0;
			}
		});
	}

	public hover(x: number, y: number) {
		this.tooltip.setPosition(x, y);
		let hover = false;

		this._pins.forEach((pin) => {
			pin.unhover();
		});

		hover = this.dialog.hover(x, y);

		if (!hover) {
			let hoverCount = 0;
			for (const pin of this._pins) {
				if (pin.visible === false) {
					continue;
				}

				const bounds = pin.getCanvasBounds(this.x, this.y, this.zoom);

				if (x >= bounds.x && x <= bounds.x + bounds.width && (y >= bounds.y && y <= bounds.y + bounds.height)) {
					hover = true;
					hoverCount++;
					pin.hover();
				}
			}

			if (hoverCount === 1) {
				this.tooltip.show();
			} else {
				this.tooltip.hide();
			}
		}

		if (hover) {
			this._element.style.cursor = "pointer";
		} else {
			this._element.style.cursor = "";
		}
	}

	public click(x: number, y: number) {
		let clicked = false;

		clicked = this.dialog.click(x, y);

		if (clicked) {
			return;
		}

		const clickedPins = [];
		this._pins.forEach((pin) => {
			if (pin.visible === false) {
				return;
			}

			const bounds = pin.getCanvasBounds(this.x, this.y, this.zoom);

			if (x >= bounds.x && x <= bounds.x + bounds.width && (y >= bounds.y && y <= bounds.y + bounds.height)) {
				clickedPins.push(pin);
			}
		});

		if (clickedPins.length === 0) {
			return;
		} else if (clickedPins.length === 1) {
			const clickedPin = clickedPins[clickedPins.length - 1];
			const bounds = clickedPin.getCanvasBounds(this.x, this.y, this.zoom);

			const dialogX = bounds.x - prompt.element.offsetWidth / 2 + bounds.width / 2;
			const dialogY = bounds.y - prompt.element.offsetHeight;
			this.dialog.setPosition(dialogX, dialogY);
			this.dialog.show();
			this.dialog.setConfirmCallback(() => {
				clickedPin.complete();
			});
		} else {
			this.adjustZoom(ISOLATION_ZOOM - this.zoom, x, y);
		}
	}

	public triggerUpdate() {
		if (!this.isUpdating) {
			this.isUpdating = true;
			setTimeout(this.update.bind(this), 1);
		} else {
			this.shouldUpdate = true;
		}
	}

	private update() {
		// TODO UPDATE_TIMER
		this.shouldUpdate = false;

		this.updatePosition();
		this._zoom += (this.targetZoom - this._zoom) * 0.5;

		if (this._x !== this.targetX || this._y !== this.targetY || this._zoom !== this.targetZoom) {
			this.triggerUpdate();
		}

		this._pins.forEach((pin) => {
			pin.update();
		});

		this.draw();

		if (this.shouldUpdate) {
			setTimeout(this.update.bind(this), Map.UPDATE_TIMER);
		} else {
			this.isUpdating = false;
		}
	}

	private updatePosition() {
		this._x += (this.targetX - this._x) * 0.5;
		this._y += (this.targetY - this._y) * 0.5;

		const xMin = this._width - MAP_IMAGE_SIZE * this._zoom;
		const yMin = this._height - MAP_IMAGE_SIZE * this._zoom;
		const max = 0;

		if (this._x < xMin) {
			this._x = xMin;
		} else if (this._x > max) {
			this._x = max;
		}
		if (this._y < yMin) {
			this._y = yMin;
		} else if (this._y > max) {
			this._y = max;
		}
	}

	public draw() {
		if (this.image === undefined) {
			return;
		}
		this._context.clearRect(0, 0, this._width, this._height);
		this._context.drawImage(this.image, this._x, this._y, MAP_IMAGE_SIZE * this._zoom, MAP_IMAGE_SIZE * this._zoom);

		this._pins.forEach((pin) => {
			pin.draw(this._context, this._x, this._y, this._zoom);
		});

		this.tooltip.draw(this._context);
		this.dialog.draw(this._context);
	}
}

export const map = new Map();
