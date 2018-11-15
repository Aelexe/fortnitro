import { Button } from "./button";

class Prompt {
	/* Elements */
	private _element;
	private completeButton: Button;
	private cancelButton: Button;

	/* Properties */
	private callback;

	constructor() {
		this._element = document.createElement("div");
		this._element.className = "dialog";

		const textElement = document.createElement("div");
		textElement.textContent = "Complete challenge marker?";
		textElement.style.fontSize = "14px";
		textElement.style.color = "white";
		this._element.appendChild(textElement);

		const buttonsElement = document.createElement("div");
		buttonsElement.className = "buttons";
		buttonsElement.style.fontSize = "18px";
		this._element.appendChild(buttonsElement);

		this.completeButton = new Button("complete");
		buttonsElement.appendChild(this.completeButton.element);
		this.completeButton.element.addEventListener("click", () => {
			if (this.callback !== undefined) {
				this.callback();
				this.callback = undefined;
				this.hide();
			}
		});

		this.cancelButton = new Button("cancel");
		buttonsElement.appendChild(this.cancelButton.element);
		this.cancelButton.element.addEventListener("click", () => {
			if (this.callback !== undefined) {
				this.removeConfirmCallback();
				this.hide();
			}
		});
	}

	get element() {
		return this._element;
	}

	public show() {
		this._element.style.display = "";
	}

	public hide() {
		this._element.style.display = "none";
	}

	public setPosition(x: number, y: number) {
		this._element.style.left = x;
		this._element.style.top = y;
	}

	public setConfirmCallback(callback) {
		this.callback = callback;
	}

	public removeConfirmCallback() {
		this.callback = undefined;
	}

}

export const prompt: Prompt = new Prompt();
