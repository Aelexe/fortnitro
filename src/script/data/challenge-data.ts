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
			name: "14 Days of Fortnite",
			subChallengeSets: [
				{
					id: "14days_2018",
					name: "14 Days of Fortnite",
					challenges: [
						{
							id: "14_2018_c1",
							type: "simple",
							description: "Start or Join a Creative Server"
						},
						{
							id: "14_2018_c2",
							type: "progress",
							description: "Visit 2 giant candy canes",
							amount: 2,
							pins: [
								{ id: "14_2018_c2_p1", x: 1354, y: 334, image: "candycane" },
								{ id: "14_2018_c2_p2", x: 202, y: 1118, image: "candycane" },
								{ id: "14_2018_c2_p3", x: 650, y: 988, image: "candycane" },
								{ id: "14_2018_c2_p4", x: 846, y: 1308, image: "candycane" }
							]
						}
					]
				}
			]
		},
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
							description: "Pick up an item of each rarity"
						},
						{
							id: "s7_w1_c2",
							type: "progress",
							description: "Dance in 7 different forbidden locations",
							amount: 7,
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
							description: "Play 5 matches with at least one elimination"
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
								{ id: "s7_w1_c4_p1", x: 1262, y: 1480, image: "dance" },
								{ id: "s7_w1_c4_p2", x: 1508, y: 568, image: "dance" },
								{ id: "s7_w1_c4_p3", x: 290, y: 1214, image: "dance" }
							]
						},
						{
							id: "s7_w1_c5",
							type: "simple",
							description: "Deal Headshot Damage to opponents"
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
							pins: allNamedLocations("s7_w1_c7", "kill")
						},
						{
							id: "s7_w1_c8",
							type: "hidden",
							description: "Find the secret Battle Star",
							pin: { id: "s7_w1_c8_p1", x: 274, y: 1248, image: "star" }
						}
					]
				},
				{
					id: "s7_w2",
					name: "Week 2",
					challenges: [
						{
							id: "s7_w2_c1",
							type: "progress",
							description: "Search a chest in 7 different Named Locations",
							amount: 7,
							pins: allNamedLocations("s7_w2_c1", "chest")
						},
						{
							id: "s7_w2_c2",
							type: "simple",
							description: "Damage opponents with 5 different types of weapons"
						},
						{
							id: "s7_w2_c3",
							type: "simple",
							description: "Eliminate 3 opponents in Snobby Shores or Fatal Fields",
							pin: {
								id: "s7_w2_c3_p1",
								location: "snobbyShores",
								image: "kill",
								links: [{ location: "fatalFields", image: "kill" }]
							}
						},
						{
							id: "s7_w2_c4",
							type: "staged",
							descriptions: [
								"Stage 1: Visit Snobby Shores and Pleasant Park in a single match",
								"Stage 2: Visit Dusty Divot and Lonely Lodge in a single match",
								"Final Stage: Visit Frosty Flights and Tomato Temple in a single match"
							],
							pins: [
								{
									id: "s7_w2_c4_p1",
									location: "snobbyShores",
									image: "redMarker",
									links: [{ location: "pleasantPark", image: "redMarker" }]
								},
								{
									id: "s7_w2_c4_p2",
									location: "dustyDivot",
									image: "redMarker",
									links: [{ location: "lonelyLodge", image: "redMarker" }]
								},
								{
									id: "s7_w2_c4_p3",
									location: "frostyFlights",
									image: "redMarker",
									links: [{ location: "tomatoTemple", image: "redMarker" }]
								}
							]
						},
						{
							id: "s7_w2_c5",
							type: "progress",
							description: "Play the Sheet Music on the pianos near Pleasant Park and Lonely Lodge",
							amount: 2,
							pins: [
								{ id: "s7_w2_c5_p1", x: 342, y: 486, image: "piano" },
								{ id: "s7_w2_c5_p2", x: 1560, y: 762, image: "piano" }
							]
						},
						{
							id: "s7_w2_c6",
							type: "simple",
							description: "Compete in a Dance Off at an abandoned mansion",
							pin: { id: "s7_w2_c6_p1", x: 1552, y: 824, image: "dance" }
						},
						{
							id: "s7_w2_c7",
							type: "simple",
							description: "Eliminate an opponent from at least 50m away"
						},
						{
							id: "s7_w2_c8",
							type: "hidden",
							description: "Find the hidden banner",
							pin: { id: "s7_w2_c8_p1", x: 232, y: 1208, image: "banner" }
						}
					]
				},
				{
					id: "s7_w3",
					name: "Week 3",
					challenges: [
						{
							id: "s7_w3_c1",
							type: "simple",
							description: "Ride a Zipline in 5 different matches"
						},
						{
							id: "s7_w3_c2",
							type: "staged",
							descriptions: [
								"Stage 1: Land at Lonely Lodge",
								"Stage 2: Land at Pleasant Park",
								"Stage 3: Land at Lucky Landing",
								"Stage 4: Land at Lazy Links",
								"Final Stage: Land at Tilted Towers"
							],
							pins: [
								{ id: "s7_w3_c2_p1", location: "lonelyLodge", image: "glider" },
								{ id: "s7_w3_c2_p2", location: "pleasantPark", image: "glider" },
								{ id: "s7_w3_c2_p3", location: "luckyLanding", image: "glider" },
								{ id: "s7_w3_c2_p4", location: "lazyLinks", image: "glider" },
								{ id: "s7_w3_c2_p5", location: "tiltedTowers", image: "glider" }
							]
						},
						{
							id: "s7_w3_c3",
							type: "simple",
							description: "Get 2 legendary weapon eliminations"
						},
						{
							id: "s7_w3_c4",
							type: "simple",
							description: "Search 7 chests at Polar Peak or Tomato Temple",
							pin: {
								id: "s7_w3_c4_p1",
								location: "polarPeak",
								image: "chest",
								links: [{ location: "tomatoTemple", image: "chest" }]
							}
						},
						{
							id: "s7_w3_c5",
							type: "simple",
							description: "Ring a doorbell in 2 different named locations in a single match"
						},
						{
							id: "s7_w3_c6",
							type: "simple",
							description: "Search between three ski lodges",
							pin: { id: "s7_w3_c6_p1", x: 368, y: 1310, image: "star" }
						},
						{
							id: "s7_w3_c7",
							type: "staged",
							descriptions: [
								"Stage 1: Deal 200 damage with Shotguns to opponents",
								"Stage 2: Deal damage with Pistols to opponents",
								"Final Stage: Deal damage with Sniper Rifles to opponents"
							]
						},
						{
							id: "s7_w3_c8",
							type: "hidden",
							description: "Find the secret Battle Star",
							pin: { id: "s7_w3_c8_p1", x: 188, y: 1204, image: "star" }
						}
					]
				},
				{
					id: "s7_w4",
					name: "Week 4",
					challenges: [
						{
							id: "s7_w4_c1",
							type: "simple",
							description: "Use an X-4 Stormwing plane in 5 different matches"
						},
						{
							id: "s7_w4_c2",
							type: "progress",
							description: "Launch 3 fireworks",
							amount: 3,
							pins: [
								{ id: "s7_w4_c2_p1", x: 280, y: 140, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 688, y: 276, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 1070, y: 282, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 1456, y: 348, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 220, y: 424, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 268, y: 658, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 1488, y: 654, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 112, y: 904, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 1516, y: 974, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 414, y: 1314, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 598, y: 1464, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 954, y: 1534, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 1354, y: 1448, image: "firework" },
								{ id: "s7_w4_c2_p1", x: 1468, y: 1226, image: "firework" }
							]
						},
						{
							id: "s7_w4_c3",
							type: "simple",
							description: "Eliminate 3 opponents at Expedition Outposts"
						},
						{
							id: "s7_w4_c4",
							type: "staged",
							descriptions: [
								"Stage 1: Destroy 80 chairs",
								"Stage 2: Destroy utility poles",
								"Final Stage: Destroy wooden palettes"
							]
						},
						{
							id: "s7_w4_c5",
							type: "simple",
							description: "Deal 100 damage with a pickaxe to opponents"
						},
						{
							id: "s7_w4_c6",
							type: "simple",
							description: "Eliminate 3 opponents at Happy Hamlet or Pleasant Park",
							pin: {
								id: "s7_w4_c6_p1",
								location: "happyHamlet",
								image: "kill",
								links: [{ location: "pleasantPark", image: "kill" }]
							}
						},
						{
							id: "s7_w4_c7",
							type: "staged",
							descriptions: [
								"Stage 1: Search the letter 'O' west of Pleasant Park",
								"Stage 2: Search the letter 'S' at Wailing Woods",
								"Stage 3: Search the letter 'M' at Dusty Divot",
								"Stage 4: Search the letter 'N' under a frozen lake",
								"Final Stage: Visit NOMS sign in Retail Row"
							],
							pins: [
								{ id: "s7_w4_c7_p1", x: 316, y: 546, image: "noms" },
								{ id: "s7_w4_c7_p2", x: 1346, y: 482, image: "noms" },
								{ id: "s7_w4_c7_p3", x: 1000, y: 816, image: "noms" },
								{ id: "s7_w4_c7_p4", x: 372, y: 1024, image: "noms" },
								{ id: "s7_w4_c7_p5", x: 1238, y: 848, image: "noms" }
							]
						},
						{
							id: "s7_w4_c8",
							type: "hidden",
							description: "Find the hidden banner",
							pin: { id: "s7_w4_c8_p1", x: 550, y: 1380, image: "banner" }
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
