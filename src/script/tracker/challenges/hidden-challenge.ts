import { Challenge } from "./challenge";

import { Button } from "../button";
import { Pin } from "../../map/pin";

export class HiddenChallenge extends Challenge {
	private lockButton: Button;

	private isLocked: boolean = true;

	constructor(id: string, description: string, total?: number) {
		super(id, description, total);

		this.type = "hidden";
	}

	protected createDisplay() {
		super.createDisplay();

		this.element.className += " locked";

		this.lockButton = new Button("lock");
		this._buttonsElement.appendChild(this.lockButton.element);

		this.completeButton.hide();
	}

	public unlock(): void {
		if (this.isLocked) {
			this.isLocked = false;
			this.element.className = "challenge";

			this.lockButton.hide();
			this.completeButton.show();

			this.pins.forEach((pin) => {
				pin.show();
			});
		}
	}

	public addPin(pin: Pin) {
		super.addPin(pin);

		if (this.isLocked) {
			pin.hide();
		}
	}
}
