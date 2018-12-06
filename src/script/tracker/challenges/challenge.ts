import { map } from "../../map/map";
import { Pin } from "../../map/pin";

import { Button } from "../button";

import { saveData } from "../../data/save-data";

export class Challenge {
	/* Display */
	private _element;
	protected _leftBlock;
	private _rightBlock;
	private _descriptionElement;
	protected _buttonsElement;
	protected completeButton: Button;
	private resetButton: Button;

	/* Properties */
	protected id: string;
	protected type: string;
	private _description: string;
	protected pins: Pin[] = [];
	private listeners = [];

	private isHovered: boolean = false;

	/** The number of pins completed towards this challenge. */
	protected _progress: number = 0;
	/** The number of pins needed to complete the challenge. */
	protected _total: number;

	constructor(id: string, description: string, total?: number) {
		this.createDisplay();

		this.id = id;
		this.type = "challenge";
		this.description = description;

		if (total !== undefined) {
			this._total = total;
		} else if (this.pins.length > 0) {
			this._total = this.pins.length;
		} else {
			this._total = 1;
		}
	}

	protected createDisplay() {
		this._element = document.createElement("div");
		this._element.className = "challenge";

		// Blocks
		this._leftBlock = document.createElement("div");
		this._leftBlock.className = "left-block";
		this._element.appendChild(this._leftBlock);

		this._rightBlock = document.createElement("div");
		this._rightBlock.className = "right-block";
		this._element.appendChild(this._rightBlock);

		this._descriptionElement = document.createElement("div");
		this._descriptionElement.className = "description";
		this._leftBlock.appendChild(this._descriptionElement);

		this._buttonsElement = document.createElement("div");
		this._buttonsElement.className = "buttons";
		this._rightBlock.appendChild(this._buttonsElement);

		this.completeButton = new Button("complete");
		this._buttonsElement.appendChild(this.completeButton.element);

		this.resetButton = new Button("reset");
		this.resetButton.hide();
		this._buttonsElement.appendChild(this.resetButton.element);

		this.completeButton.onClick(this.complete.bind(this));
		this.resetButton.element.addEventListener("click", this.reset.bind(this));
	}

	get element() {
		return this._element;
	}

	public getId(): string {
		return this.id;
	}

	public getType(): string {
		return this.type;
	}

	set description(description) {
		this._description = description;
		this._descriptionElement.textContent = description;
	}

	public isComplete() {
		// TODO Fix the entire progress concept.
		return this._progress >= this._total;
	}

	public getProgress() {
		return this._progress;
	}

	public setProgress(progress: number) {
		if (this._progress === progress) {
			return;
		}

		this._progress = progress;

		if (this._progress === this._total) {
			this.complete();
		}
	}

	public addPin(pin: Pin) {
		this.pins.push(pin);

		pin.addListener((pinn, status) => {
			let progress = 0;
			this.pins.forEach((pinCheck) => {
				if (pinCheck.isComplete()) {
					progress++;
				}
			});

			this.setProgress(progress);
		});
	}

	public getPins(): Pin[] {
		return this.pins;
	}

	public hover() {
		if (!this.isHovered) {
			this.isHovered = true;
			this.pins.forEach((pin) => {
				pin.hover();
			});
		}
	}

	public unhover() {
		if (this.isHovered) {
			this.isHovered = false;
			this.pins.forEach((pin) => {
				pin.unhover();
			});
		}
	}

	public highlight() {
		if (!this._element.classList.contains("highlight")) {
			this._element.scrollIntoView({ block: "center", behavior: "smooth" });
			this._element.classList.add("highlight");
		}
	}

	public unhighlight() {
		this._element.classList.remove("highlight");
	}

	public addListener(listener) {
		this.listeners.push(listener);
	}

	public complete() {
		saveData.setChallengeCompletion(this.id, true);
		this.setProgress(this._total);

		this._element.classList.add("complete");
		this.completeButton.hide();
		this.resetButton.show();

		this.pins.forEach((pin) => {
			pin.complete();
		});

		map.draw();

		this.listeners.forEach((listener) => {
			listener(this, "complete");
		});
	}

	public reset() {
		saveData.setChallengeCompletion(this.id, false);
		this.setProgress(0);

		this._element.classList.remove("complete");
		this.resetButton.hide();
		this.completeButton.show();

		this.pins.forEach((pin) => {
			pin.reset();
		});

		map.draw();

		this.listeners.forEach((listener) => {
			listener(this, "reset");
		});
	}
}
