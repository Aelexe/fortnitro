import * as Cookies from "../lib/js.cookie";

class SaveData {
	private static readonly COOKIE_NAME = "savedData";

	private data;

	constructor() {
		this.loadCookie();
	}

	private loadCookie() {
		const cookie: string = Cookies.get(SaveData.COOKIE_NAME);

		if (cookie !== undefined) {
			this.data = JSON.parse(cookie);
		} else {
			this.data = {};
			this.saveCookie();
		}
	}

	private saveCookie() {
		Cookies.set(SaveData.COOKIE_NAME, JSON.stringify(this.data));
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
