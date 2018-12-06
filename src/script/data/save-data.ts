const DEFAULT_PROFILE_NAME = "default";
const CURRENT_VERSION = 0;

class SaveData {
	private profileName: string;
	private data;
	private challenges;
	private pins;
	private config;

	constructor(profileName?: string) {
		this.loadProfile(profileName || DEFAULT_PROFILE_NAME);
	}

	private loadProfile(profileName: string) {
		this.profileName = profileName;

		if (localStorage[profileName] === undefined) {
			this.initialiseData();
			this.saveData();
		} else {
			this.loadData();
		}
	}

	private initialiseData() {
		this.data = {};
		this.data.version = CURRENT_VERSION;
		this.data.progress = {
			challenges: {},
			pins: {}
		};
		this.data.config = {};
	}

	private loadData() {
		this.data = JSON.parse(localStorage[this.profileName]);
		this.challenges = this.data.progress.challenges;
		this.pins = this.data.progress.pins;
		this.config = this.data.config;
	}

	private saveData() {
		localStorage[this.profileName] = JSON.stringify(this.data);
	}

	public getChallenge(challengeId: string) {
		if (this.challenges[challengeId] === undefined) {
			this.challenges[challengeId] = {};
		}

		return this.challenges[challengeId];
	}

	public getChallengeCompletion(challengeId: string): boolean {
		return this.getChallenge(challengeId).isComplete;
	}

	public setChallengeCompletion(challengeId: string, isComplete: boolean) {
		this.getChallenge(challengeId).isComplete = isComplete;
		this.saveData();
	}

	public getChallengeProgress(challengeId: string): number {
		return this.getChallenge(challengeId).progress;
	}

	public setChallengeProgress(challengeId: string, progress: number) {
		this.getChallenge(challengeId).progress = progress;
		this.saveData();
	}

	public getPin(pinId: string) {
		if (this.pins[pinId] === undefined) {
			this.pins[pinId] = {};
		}

		return this.pins[pinId];
	}

	public getPinCompletion(pinId: string) {
		return this.getPin(pinId).isComplete;
	}

	public setPinCompletion(pinId: string, isComplete: boolean) {
		this.getPin(pinId).isComplete = isComplete;
		this.saveData();
	}
}

export const saveData = new SaveData();
