import { Challenge, ProgressChallenge, StagedChallenge, HiddenChallenge } from "./challenges";
import { MinorSet, MajorSet } from "./sets";

import { map, Pin } from "../map";

import { saveData } from "../data/save-data";

import * as SimpleBar from "../lib/simplebar";

export class Tracker {
	/* Display */
	private rootElement: HTMLElement;

	/* Properties */
	private majorSets: MajorSet[] = [];
	private minorSets: MinorSet[] = [];
	private challenges: Challenge[] = [];

	constructor(challengeData: any, rootElement: HTMLElement) {
		this.rootElement = rootElement;

		this.load(challengeData);
		this.loadCookies();

		const simpleBar = new SimpleBar(this.rootElement, { autoHide: false });
	}

	private load(challengeData: any): void {
		challengeData.challengeSets.forEach((mcData) => {
			const majorChallenge: MajorSet = new MajorSet(mcData.name);
			this.majorSets.push(majorChallenge);
			this.rootElement.appendChild(majorChallenge.element);

			mcData.subChallengeSets.forEach((scData: any) => {
				const minorSet: MinorSet = new MinorSet(scData.name);
				this.minorSets.push(minorSet);
				majorChallenge.append(minorSet);

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
					minorSet.append(challenge);

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
							pin.setParent(challenge);
							map.addPin(pin);
							pin.scale = 0;

							setTimeout(() => {
								pin.hover();
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
		this.challenges.forEach((challenge) => {
			challenge.getPins().forEach((pin) => {
				if (saveData.getPinCompletion(pin.getId())) {
					pin.complete();
				} else {
					pin.reset();
				}
			});
			if (saveData.getChallengeCompletion(challenge.getId())) {
				challenge.complete();
			} else if (saveData.getChallengeProgress(challenge.getId()) !== undefined) {
				challenge.setProgress(saveData.getChallengeProgress(challenge.getId()));
			}
		});

		this.minorSets.forEach((minorSet) => {
			if (minorSet.isComplete()) {
				minorSet.collapse(true);
			}
		});
	}
}
