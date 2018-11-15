import { MajorChallenge } from "./tracker/major-challenge";
import { MinorChallenge } from "./tracker/minor-challenge";
import { Challenge, ProgressChallenge, StagedChallenge, HiddenChallenge } from "./tracker/challenges";

import { map } from "./map/map";
import { Pin } from "./map/pin";

import { saveData } from "./data/save-data";

import * as SimpleBar from "./lib/simplebar";

export class Tracker {
	/* Display */
	private rootElement: HTMLElement;

	/* Properties */
	private majorChallenges: MajorChallenge[] = [];
	private minorChallenges: MinorChallenge[] = [];
	private challenges: Challenge[] = [];

	constructor(challengeData: any, rootElement: HTMLElement) {
		this.rootElement = rootElement;

		this.load(challengeData);
		this.loadCookies();

		const simpleBar = new SimpleBar(this.rootElement, { autoHide: false });
	}

	private load(challengeData: any): void {
		challengeData.challengeSets.forEach((mcData) => {
			const majorChallenge: MajorChallenge = new MajorChallenge(mcData.name);
			this.majorChallenges.push(majorChallenge);
			this.rootElement.appendChild(majorChallenge.element);

			mcData.subChallengeSets.forEach((scData: any) => {
				const minorChallenge: MinorChallenge = new MinorChallenge(scData.name);
				this.minorChallenges.push(minorChallenge);
				majorChallenge.append(minorChallenge);

				scData.challenges.forEach((cData) => {
					let challenge: Challenge;
					if (cData.type === "simple") {
						challenge = new Challenge(cData.id, cData.description, cData.amount);
					} else if (cData.type === "progress") {
						challenge = new ProgressChallenge(cData.id, cData.description, cData.amount);
					} else if (cData.type === "staged") {
						challenge = new StagedChallenge(cData.id, cData.descriptions);
					} else if (cData.type === "hidden") {
						challenge = new HiddenChallenge(cData.id, cData.description);
					}
					this.challenges.push(challenge);
					minorChallenge.append(challenge);

					let pins: any[];
					if (cData.pin !== undefined) {
						pins = [cData.pin];
					} else if (cData.pins !== undefined) {
						pins = cData.pins;
					}

					if (pins !== undefined) {
						pins.forEach((pData) => {
							const pin: Pin = new Pin(pData.id, pData.x, pData.y, pData.image);
							if (pData.links !== undefined) {
								pData.links.forEach((linkPData) => {
									const linkedPin: Pin = new Pin(linkPData.id, linkPData.x, linkPData.y, linkPData.image);

									pin.addLinkedPin(linkedPin);
									map.addPin(linkedPin);
									linkedPin.scale = 0;
								});
							}
							challenge.addPin(pin);
							map.addPin(pin);
							pin.scale = 0;

							setTimeout(() => {
								pin.unhover();
							}, Math.random() * 1000);
						});
					}

					challenge.element.addEventListener("mouseover", (event) => {
						challenge.hover();
					});
					challenge.element.addEventListener("mouseout", (event) => {
						challenge.unhover();
					});
				});
			});
		});
	}

	private loadCookies(): void {
		// TODO: Remove this.
		saveData.resetCookie();

		this.challenges.forEach((challenge) => {
			challenge.getPins().forEach((pin) => {
				if (saveData.getPinCompletion(pin.getId())) {
					pin.complete();
				}
			});
			if (saveData.getChallengeCompletion(challenge.getId())) {
				challenge.complete();
			}
		});
	}
}
