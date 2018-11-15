export class Button {

	/* Elements */
	private _element;

	/* Properties */
	private callback: () => void;

	constructor(type: string) {
		this._element = document.createElement("i");
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
		let iconClass;
		switch (type) {
			case "plus":
				iconClass = "fa-plus";
				break;
			case "minus":
				iconClass = "fa-minus";
				break;
			case "complete":
				iconClass = "fa-check";
				break;
			case "next":
				iconClass = "fa-arrow-right";
				break;
			case "reset":
				iconClass = "fa-redo";
				break;
			case "cancel":
				iconClass = "fa-ban";
				break;
			case "lock":
				iconClass = "fa-lock";
				break;
			default:
				iconClass = "";
				break;
		}

		this._element.className = "button fas " + iconClass;
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
