import * as Cookies from "../lib/js.cookie";

const DEFAULT_COOKIE_NAME = "default";

class SaveData {
	private profileName: string;
	private data;

	constructor(profileName?: string) {
		this.loadCookie(profileName || DEFAULT_COOKIE_NAME);
	}

	private loadCookie(profileName: string) {
		this.profileName = profileName;
		const cookie: string = Cookies.get(this.profileName);

		if (cookie !== undefined) {
			this.data = JSON.parse(cookie);
		} else {
			this.data = {};
			this.saveCookie();
		}
	}

	private saveCookie() {
		Cookies.set(this.profileName, JSON.stringify(this.data));
	}

	public resetCookie() {
		this.data = {};
		this.saveCookie();
	}

	public getChallengeCompletion(challengeId: string) {
		return this.data[challengeId];
	}

	public setChallengeCompletion(challengeId: string, isComplete: boolean) {
		this.data[challengeId] = isComplete;
		this.saveCookie();
	}

	public getPinCompletion(pinId: string) {
		return this.data[pinId];
	}

	public setPinCompletion(pinId: string, isComplete: boolean) {
		this.data[pinId] = isComplete;
		this.saveCookie();
	}
}

export const saveData = new SaveData();
