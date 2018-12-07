const namedLocations = {
	junkJunction: { x: 316, y: 194 },
	lazyLinks: { x: 860, y: 350 },
	riskyReels: { x: 1208, y: 326 },
	hauntedHills: { x: 254, y: 332 },
	pleasantPark: { x: 458, y: 476 },
	lootLake: { x: 708, y: 608 },
	tomatoTemple: { x: 1054, y: 520 },
	wailingWoods: { x: 1344, y: 482 },
	lonelyLodge: { x: 1446, y: 654 },
	snobbyShores: { x: 148, y: 726 },
	tiltedTowers: { x: 604, y: 812 },
	dustyDivot: { x: 978, y: 816 },
	retailRow: { x: 1218, y: 872 },
	frostyFlights: { x: 194, y: 1212 },
	polarPeak: { x: 416, y: 1136 },
	shiftyShafts: { x: 600, y: 1038 },
	saltySprings: { x: 928, y: 1002 },
	happyHamlet: { x: 538, y: 1408 },
	fatalFields: { x: 980, y: 1246 },
	paradisePalms: { x: 1334, y: 1202 },
	luckyLanding: { x: 924, y: 1484 }
};

const allNamedLocations = (challengeId, imageName) => {
	const pins = [];
	let i = 1;
	Object.keys(namedLocations).forEach((locationKey) => {
		pins.push({ id: challengeId + "_p" + i, location: locationKey, image: imageName });
		i++;
	});

	return pins;
};

const challengeData = {
	challengeSets: [
		{
			name: "Weekly Challenges",
			subChallengeSets: [
				{
					id: "s7_w1",
					name: "Week 1",
					challenges: [
						{
							id: "s7_w1_c1",
							type: "simple",
							description: "Pick up an item of each rarity",
							pinType: "none"
						},
						{
							id: "s7_w1_c2",
							type: "progress",
							description: "Dance in 7 different forbidden locations",
							amount: 7,
							pinType: "multi",
							pins: [
								{ id: "s7_w1_c2_p1", x: 280, y: 142, image: "dance" },
								{ id: "s7_w1_c2_p2", x: 894, y: 330, image: "dance" },
								{ id: "s7_w1_c2_p3", x: 1186, y: 426, image: "dance" },
								{ id: "s7_w1_c2_p4", x: 1348, y: 284, image: "dance" },
								{ id: "s7_w1_c2_p6", x: 410, y: 668, image: "dance" },
								{ id: "s7_w1_c2_p7", x: 1008, y: 740, image: "dance" },
								{ id: "s7_w1_c2_p8", x: 900, y: 908, image: "dance" },
								{ id: "s7_w1_c2_p9", x: 172, y: 1414, image: "dance" },
								{ id: "s7_w1_c2_p10", x: 272, y: 1338, image: "dance" },
								{ id: "s7_w1_c2_p11", x: 1412, y: 1282, image: "dance" }
							]
						},
						{
							id: "s7_w1_c3",
							type: "simple",
							description: "Play 5 matches with at least one elimination",
							pinType: "none"
						},
						{
							id: "s7_w1_c4",
							type: "staged",
							descriptions: [
								"Stage 1: Dance on top of a crown of RV's",
								"Stage 2: Dance on top of a Metal Turtle",
								"Final Stage: Dance on top of a Submarine"
							],
							pins: [
								{ id: "s7_w1_c6_p1", x: 1262, y: 1480, image: "dance" },
								{ id: "s7_w1_c6_p2", x: 1508, y: 568, image: "dance" },
								{ id: "s7_w1_c6_p3", x: 290, y: 1214, image: "dance" }
							]
						},
						{
							id: "s7_w1_c5",
							type: "simple",
							description: "Deal Headshot Damage to opponents",
							pinType: "none"
						},
						{
							id: "s7_w1_c6",
							type: "staged",
							descriptions: [
								"Stage 1: Search 5 Ammo Boxes in a single match",
								"Stage 2: Search 3 Chests in a single match",
								"Final Stage: Search 1 Supply Drop"
							]
						},
						{
							id: "s7_w1_c7",
							type: "progress",
							description: "Eliminate opponents in 5 different Named Locations",
							amount: 5,
							pinType: "multi",
							pins: allNamedLocations("s6_w1_c7", "kill")
						},
						{
							id: "s7_w1_c8",
							type: "hidden",
							description: "Find the secret Battle Star",
							pin: { id: "s7_w1_c8_p1", x: 274, y: 1248, image: "star" }
						}
					]
				}
			]
		}
	]
};

const annotatePin = (pin) => {
	if (pin.location === undefined) {
		return;
	}

	const pinLocation = namedLocations[pin.location];

	if (pinLocation.index === undefined) {
		pinLocation.index = 0;
		pin.x = pinLocation.x;
		pin.y = pinLocation.y;
	} else {
		const magnitude = pinLocation.index / 4 + 1;
		const offset = 30;
		const direction = pinLocation.index % 4;

		if (direction === 0) {
			pin.x = pinLocation.x + offset * magnitude;
		} else if (direction === 2) {
			pin.x = pinLocation.x - offset * magnitude;
		} else {
			pin.x = pinLocation.x;
		}

		if (direction === 1) {
			pin.y = pinLocation.y + offset * magnitude;
		} else if (direction === 3) {
			pin.y = pinLocation.y - offset * magnitude;
		} else {
			pin.y = pinLocation.y;
		}

		pinLocation.index++;
	}

	if (pin.links !== undefined) {
		pin.links.forEach(annotatePin);
	}
};

challengeData.challengeSets.forEach((challengeSet: any) => {
	challengeSet.subChallengeSets.forEach((subChallengeSet: any) => {
		subChallengeSet.challenges.forEach((challenge: any) => {
			let pins;

			if (challenge.pin !== undefined) {
				pins = [challenge.pin];
			} else if (challenge.pins !== undefined) {
				pins = challenge.pins;
			}

			if (pins === undefined) {
				return;
			}
			pins.forEach(annotatePin);
		});
	});
});

export default challengeData;
