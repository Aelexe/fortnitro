import * as Cookies from "../lib/js.cookie";

const DEFAULT_COOKIE_NAME = "default";
const CURRENT_VERSION = 0;

class SaveData {
	private profileName: string;
	private cookie;
	private challenges;
	private pins;
	private config;

	constructor(profileName?: string) {
		this.loadCookie(profileName || DEFAULT_COOKIE_NAME);
	}

	private loadCookie(profileName: string) {
		this.profileName = profileName;
		const cookie: string = Cookies.get(this.profileName);

		if (cookie !== undefined) {
			this.cookie = JSON.parse(cookie);
			this.challenges = this.cookie.progress.challenges;
			this.pins = this.cookie.progress.pins;
			this.config = this.cookie.config;
		} else {
			this.resetCookie();
		}
	}

	private saveCookie() {
		Cookies.set(this.profileName, JSON.stringify(this.cookie));
	}

	public resetCookie() {
		this.cookie = {
			version: CURRENT_VERSION,
			progress: {
				challenges: {},
				pins: {}
			},
			config: {}
		};
		this.challenges = this.cookie.progress.challenges;
		this.pins = this.cookie.progress.pins;
		this.config = this.cookie.config;
		this.saveCookie();
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
		this.saveCookie();
	}

	public getChallengeProgress(challengeId: string): number {
		return this.getChallenge(challengeId).progress;
	}

	public setChallengeProgress(challengeId: string, progress: number) {
		this.getChallenge(challengeId).progress = progress;
		this.saveCookie();
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
		this.saveCookie();
	}
}

export const saveData = new SaveData();
