import * as Cookies from "../lib/js.cookie";

const DEFAULT_COOKIE_NAME = "default";
const CURRENT_VERSION = 0;

class SaveData {
	private profileName: string;
	private data;
	private progress;
	private config;

	constructor(profileName?: string) {
		this.loadCookie(profileName || DEFAULT_COOKIE_NAME);
	}

	private loadCookie(profileName: string) {
		this.profileName = profileName;
		const cookie: string = Cookies.get(this.profileName);

		if (cookie !== undefined) {
			this.data = JSON.parse(cookie);
			this.progress = this.data.progress;
			this.config = this.data.config;
		} else {
			this.resetCookie();
		}
	}

	private saveCookie() {
		Cookies.set(this.profileName, JSON.stringify(this.data));
	}

	public resetCookie() {
		this.data = {
			version: CURRENT_VERSION,
			progress: {},
			config: {}
		};
		this.progress = this.data.progress;
		this.config = this.data.config;
		this.saveCookie();
	}

	public getChallengeCompletion(challengeId: string) {
		return this.progress[challengeId];
	}

	public setChallengeCompletion(challengeId: string, isComplete: boolean) {
		this.progress[challengeId] = isComplete;
		this.saveCookie();
	}

	public getPinCompletion(pinId: string) {
		return this.progress[pinId];
	}

	public setPinCompletion(pinId: string, isComplete: boolean) {
		this.progress[pinId] = isComplete;
		this.saveCookie();
	}
}

export const saveData = new SaveData();
