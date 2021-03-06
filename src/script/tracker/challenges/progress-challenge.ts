import { Challenge } from "./challenge";

import { ProgressBar } from "../progress-bar";

export class ProgressChallenge extends Challenge {
	/* Elements */
	private progressBar: ProgressBar;

	protected createDisplay() {
		super.createDisplay();

		this.progressBar = new ProgressBar();
		this._leftBlock.appendChild(this.progressBar.element);
	}

	public isComplete(): boolean {
		// >= because challenges may contain more pins than the completion criteria.
		return this._progress >= this._total;
	}

	public setProgress(progress: number) {
		super.setProgress(progress);

		let progressPercent = progress / this._total;
		if (progressPercent > 1) {
			progressPercent = 1;
		}

		this.progressBar.setProgress(progressPercent);
	}
}
