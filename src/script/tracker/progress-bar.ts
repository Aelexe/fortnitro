export class ProgressBar {
	/* Elements */
	private _element;
	private _fill;

	constructor() {
		this._element = document.createElement("div");
		this._element.className = "progress-bar";

		this._fill = document.createElement("div");
		this._fill.className = "progress-bar-fill";
		this._element.appendChild(this._fill);

		this.progress = 0;
	}

	get element() {
		return this._element;
	}

	set progress(progress: number) {
		const progressString = progress * 100 + "%";
		this._fill.style.width = progressString;
	}
}
