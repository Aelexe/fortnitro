import { MinorChallenge } from "./minor-challenge";

export class MajorChallenge {

	/* Elements */
	private _element;
	private _descriptionElement;

	constructor(description: string) {
		this.createDivs();

		this.description = description;
	}

	private createDivs() {
		this._element = document.createElement("div");
		this._element.className = "challenge-set-major";

		this._descriptionElement = document.createElement("h2");
		this._element.appendChild(this._descriptionElement);
	}

	get element() {
		return this._element;
	}

	set description(description) {
		this._descriptionElement.textContent = description;
	}

	public append(minorChallenge: MinorChallenge) {
		this._element.appendChild(minorChallenge.element);
	}

}
