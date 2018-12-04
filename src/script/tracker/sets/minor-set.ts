import { Challenge, HiddenChallenge } from "../challenges";

import { Button } from "../button";

export class MinorSet {
	/* Display */
	private _element;
	private _block;
	private _leftBlock;
	private _rightBlock;
	private _descriptionElement;
	private _listContainer;
	private _listElement;

	private _collapseButton;

	/* Properties */
	private challenges: Challenge[] = [];
	private collapsed: boolean = false;

	constructor(description: string) {
		this.createDivs();

		this.description = description;
	}

	private createDivs() {
		this._element = document.createElement("div");
		this._element.className = "challenge-set-minor";

		this._block = document.createElement("div");
		this._block.className = "block";
		this._element.appendChild(this._block);

		this._leftBlock = document.createElement("div");
		this._leftBlock.className = "left-block";
		this._block.appendChild(this._leftBlock);

		this._rightBlock = document.createElement("div");
		this._rightBlock.className = "right-block";
		this._block.appendChild(this._rightBlock);

		this._descriptionElement = document.createElement("h3");
		this._leftBlock.appendChild(this._descriptionElement);

		this._collapseButton = new Button("minus");
		this._rightBlock.appendChild(this._collapseButton.element);

		this._listContainer = document.createElement("div");
		this._listContainer.className = "list-container";
		this._element.appendChild(this._listContainer);

		this._listElement = document.createElement("div");
		this._listElement.className = "list";
		this._listContainer.appendChild(this._listElement);

		this._collapseButton.element.addEventListener(
			"click",
			(() => {
				if (!this.collapsed) {
					this.collapse();
				} else {
					this.expand();
				}
			}).bind(this)
		);
	}

	get element() {
		return this._element;
	}

	set description(description) {
		this._descriptionElement.textContent = description;
	}

	public append(challenge: Challenge) {
		this.challenges.push(challenge);
		this._listElement.appendChild(challenge.element);

		challenge.addListener((e, status) => {
			let completeCount = 0;
			for (const challengee of this.challenges) {
				if (challengee.isComplete()) {
					completeCount++;
				}
			}

			if (completeCount === this.challenges.length - 1) {
				const lastChallenge: Challenge = this.challenges[this.challenges.length - 1];
				if (lastChallenge.getType() === "hidden") {
					(lastChallenge as HiddenChallenge).unlock();
				}
			}

			if (completeCount === this.challenges.length) {
				this._element.className += " complete";
				this.collapse();
			} else {
				this._element.className = "challenge-set-minor";
			}
		});
	}

	public collapse(): void {
		this.collapsed = true;
		// Get current height of list.
		const listHeight = this._listElement.clientHeight;
		this._listContainer.style.height = listHeight + "px";
		setTimeout(() => {
			this._listContainer.style.height = "0px";
			this._listElement.style.top = -listHeight;
		}, 10);
		this._collapseButton.setIcon("plus");
	}

	public expand(): void {
		this.collapsed = false;
		// Get current height of list.
		const listHeight = this._listElement.clientHeight;
		setTimeout(() => {
			this._listContainer.style.height = listHeight + "px";
			this._listElement.style.top = 0;
		}, 10);
		this._collapseButton.setIcon("minus");
	}
}
