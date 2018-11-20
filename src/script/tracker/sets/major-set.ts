import { MinorSet } from "./minor-set";

export class MajorSet {
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

	public append(minorSet: MinorSet) {
		this._element.appendChild(minorSet.element);
	}
}
