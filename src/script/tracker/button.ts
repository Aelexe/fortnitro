export class Button {
	/* Elements */
	private _element;

	/* Properties */
	private callback: () => void;

	constructor(type: string) {
		this._element = document.createElement("img");
		this._element.className = "button";
		this._element.addEventListener("click", (e) => {
			if (this.callback !== undefined) {
				this.callback();
			}
		});

		this.setIcon(type);
	}

	get element() {
		return this._element;
	}

	public setIcon(type: string) {
		let image;
		switch (type) {
			case "minus":
				image = "img/minus.png";
				break;
			case "plus":
				image = "img/plus.png";
				break;
			case "complete":
				image = "img/tick.png";
				break;
			case "next":
				image = "img/next.png";
				break;
			case "reset":
				image = "img/reset.png";
				break;
			case "lock":
				image = "img/lock.png";
				this._element.style.cursor = "default";
				break;
			default:
				image = "";
				break;
		}

		this._element.src = image;
	}

	public show() {
		this._element.style.display = "";
	}

	public hide() {
		this._element.style.display = "none";
	}

	public onClick(callback: () => void) {
		this.callback = callback;
	}
}
