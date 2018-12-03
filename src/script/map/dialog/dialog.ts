import { map } from "../map";
import { Rectangle } from "../rectangle";

import { Button } from "./button";

const TILE_SIZE: number = 32;

export class Dialog {
	private x: number;
	private y: number;
	private width: number;
	private height: number;

	private corner: HTMLImageElement = new Image();
	private border: HTMLImageElement = new Image();
	private fill: HTMLImageElement = new Image();

	private _isHidden: boolean;

	private text: string = "Complete pin?";

	private tickButton: Button;
	private crossButton: Button;

	private callback;

	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.setWidth(width);
		this.setHeight(height);

		this.corner.src = "img/corner.png";
		this.border.src = "img/border.png";
		this.fill.src = "img/fill.png";

		this.tickButton = new Button(this.width - 24 * 2 - 12, this.height - 24 - 8, 24, 24, "tick");
		this.crossButton = new Button(this.width - 24 - 8, this.height - 24 - 8, 24, 24, "cross");
	}

	public setX(x: number) {
		this.x = Math.round(x);
	}

	public setY(y: number) {
		this.y = Math.round(y);
	}

	public setPosition(x: number, y: number) {
		this.setX(x);
		this.setY(y);
	}

	public getWidth() {
		return this.width;
	}

	public setWidth(width: number) {
		if (width < TILE_SIZE * 2) {
			this.width = TILE_SIZE * 2;
		} else {
			this.width = width;
		}
	}

	public getHeight() {
		return this.height;
	}

	public setHeight(height: number) {
		if (height < TILE_SIZE * 2) {
			this.height = TILE_SIZE * 2;
		} else {
			this.height = height;
		}
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

	public setConfirmCallback(callback) {
		this.callback = callback;
	}

	public removeConfirmCallback() {
		this.callback = undefined;
	}

	public hover(x: number, y: number): boolean {
		if (this.isHidden()) {
			return false;
		}

		const relativeX = x - this.x;
		const relativeY = y - this.y;

		if (this.tickButton.getBounds().containsPoint(relativeX, relativeY)) {
			this.tickButton.hover();
			return true;
		} else if (this.crossButton.getBounds().containsPoint(relativeX, relativeY)) {
			this.crossButton.hover();
			return true;
		}

		return false;
	}

	public click(x: number, y: number): boolean {
		if (this.tickButton.click(x - this.x, y - this.y)) {
			if (this.callback !== undefined) {
				this.callback();
			}
			this.hide();
			this.removeConfirmCallback();
		} else if (this.crossButton.click(x - this.x, y - this.y)) {
			this.hide();
			this.removeConfirmCallback();
		}

		return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
	}

	public draw(context: CanvasRenderingContext2D) {
		if (this.isHidden()) {
			return;
		}

		const ninetyDegrees = 1.5708;

		// TODO: Fix the tiles that might not draw correctly here.

		// Corners
		// Top Left
		context.drawImage(this.corner, this.x, this.y, TILE_SIZE, TILE_SIZE);

		// Top Right
		context.save();
		context.translate(this.x + this.width - TILE_SIZE, this.y);
		context.rotate(ninetyDegrees);
		context.drawImage(this.corner, 0, -TILE_SIZE, TILE_SIZE, TILE_SIZE);
		context.restore();

		// Bottom Left
		context.save();
		context.translate(this.x, this.y + this.height - TILE_SIZE);
		context.rotate(-ninetyDegrees);
		context.drawImage(this.corner, -TILE_SIZE, 0, TILE_SIZE, TILE_SIZE);
		context.restore();

		// Bottom Right
		context.save();
		context.translate(this.x + this.width - TILE_SIZE, this.y + this.height - TILE_SIZE);
		context.rotate(ninetyDegrees * 2);
		context.drawImage(this.corner, -TILE_SIZE, -TILE_SIZE, TILE_SIZE, TILE_SIZE);
		context.restore();

		// Borders
		// Top
		context.drawImage(this.border, this.x + TILE_SIZE, this.y, this.width - TILE_SIZE * 2, TILE_SIZE);

		// Bottom
		context.save();
		context.translate(this.x + TILE_SIZE, this.y + this.height - TILE_SIZE);
		context.rotate(ninetyDegrees * 2);
		context.drawImage(this.border, 0, -TILE_SIZE, -(this.width - TILE_SIZE * 2), TILE_SIZE);
		context.restore();

		// Left
		context.save();
		context.translate(this.x, this.y);
		context.rotate(-ninetyDegrees);
		context.drawImage(this.border, -TILE_SIZE, 0, -TILE_SIZE, this.height - TILE_SIZE * 2);
		context.restore();

		// Right
		context.save();
		context.translate(this.x + this.width - TILE_SIZE, this.y + TILE_SIZE);
		context.rotate(ninetyDegrees);
		context.drawImage(this.border, 0, -TILE_SIZE, TILE_SIZE, this.height - TILE_SIZE * 2);
		context.restore();

		// Center
		context.drawImage(
			this.fill,
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

		// Fill in the shadow for every pixel offset up until the shadow offset to ensure there are no gaps.
		// Omitting this leads to a faded shadow which blurs the outline considerably.
		for (let i = shadowOffset; i > 0; i--) {
			context.fillText(this.text, this.x + textXOffset - i, this.y + textYOffset);
			context.fillText(this.text, this.x + textXOffset + i, this.y + textYOffset);
			context.fillText(this.text, this.x + textXOffset, this.y + textYOffset + i);
			context.fillText(this.text, this.x + textXOffset, this.y + textYOffset - i);
		}
		context.fillStyle = "white";
		context.fillText(this.text, this.x + textXOffset, this.y + textYOffset);

		this.tickButton.draw(context, this.x, this.y);
		this.crossButton.draw(context, this.x, this.y);
	}
}
