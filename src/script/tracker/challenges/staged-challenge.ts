import { ProgressChallenge } from "./progress-challenge";

import { Button } from "../button";

import { map } from "../../map/map";
import { Pin } from "../../map/pin";

import { saveData } from "../../data/save-data";

// TODO Check this class for things that can be removed after draw scheduling.
export class StagedChallenge extends ProgressChallenge {
	private nextButton: Button;

	private descriptions: string[];

	constructor(id: string, descriptions: string[]) {
		super(id, descriptions[0], descriptions.length);

		this.descriptions = descriptions;
	}

	protected createDisplay() {
		super.createDisplay();

		this.nextButton = new Button("next");
		this._buttonsElement.appendChild(this.nextButton.element);

		this.nextButton.element.addEventListener("click", () => {
			// TODO Fix progress saving for non pins.
			if (this.pins.length !== 0) {
				this.pins[this._progress].complete();
			} else {
				this.setProgress(this.getProgress() + 1);
			}
		});

		this.completeButton.hide();
	}

	public setProgress(progress: number) {
		super.setProgress(progress);

		if (this.pins.length === 0) {
			saveData.setChallengeProgress(this.id, progress);
		}

		this.updateDisplay();
	}

	private updateDisplay() {
		this.completeButton.hide();

		if (this._progress < this._total) {
			this.nextButton.show();
		} else {
			this.nextButton.hide();
		}

		if (this._progress < this._total) {
			this.description = this.descriptions[this._progress];
		} else {
			this.description = this.descriptions[this.descriptions.length - 1];
		}

		for (let i = 0; i < this.pins.length; i++) {
			if (i !== this._progress) {
				this.pins[i].hide();
			} else {
				this.pins[i].show();
			}
		}

		map.draw();
	}

	public addPin(pin: Pin) {
		super.addPin(pin);

		if (this.pins.length - 1 !== this._progress) {
			this.pins[this.pins.length - 1].hide();
		}
	}

	public complete() {
		super.complete();

		this.updateDisplay();
	}

	public reset() {
		super.reset();

		this.updateDisplay();
	}
}
