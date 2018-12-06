const namedLocations = {
	junkJunction: { x: 434, y: 268 },
	lazyLinks: { x: 1184, y: 482 },
	riskyReels: { x: 1660, y: 450 },
	hauntedHills: { x: 350, y: 458 },
	pleasantPark: { x: 628, y: 658 },
	leakyLake: { x: 978, y: 840 },
	tomatoTemple: { x: 1446, y: 724 },
	wailingWoods: { x: 1850, y: 664 },
	lonelyLodge: { x: 1994, y: 996 },
	snobbyShores: { x: 204, y: 1000 },
	tiltedTowers: { x: 832, y: 1110 },
	dustyDivot: { x: 1340, y: 1120 },
	retailRow: { x: 1680, y: 1240 },
	greasyGrove: { x: 514, y: 1392 },
	shiftyShafts: { x: 828, y: 1416 },
	saltySprings: { x: 1270, y: 1378 },
	fatalFields: { x: 1350, y: 1726 },
	paradisePalms: { x: 1838, y: 1650 },
	flushFactory: { x: 788, y: 1966 },
	luckyLanding: { x: 1274, y: 2044 }
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
					id: "s6_w1",
					name: "Week 1",
					challenges: [
						{
							id: "s6_w1_c1",
							type: "simple",
							description: "Pick up a Legendary Item in 3 different matches",
							pinType: "none"
						},
						{
							id: "s6_w1_c2",
							type: "simple",
							description: "Regain 150 health from Cozy Campfires",
							pinType: "none"
						},
						{
							id: "s6_w1_c3",
							type: "staged",
							descriptions: [
								"Stage 1: Search 3 Chests",
								"Stage 2: Search 2 Supply Drops",
								"Final Stage: Search 1 Llama"
							]
						},
						{
							id: "s6_w1_c4",
							type: "simple",
							description: "Apply 400 Shields",
							pinType: "none"
						},
						{
							id: "s6_w1_c5",
							type: "staged",
							descriptions: [
								"Stage 1: Land in Junk Junction",
								"Stage 2: Land in Tomato Temple",
								"Stage 3: Land in Tilted Towers",
								"Stage 4: Land in Fatal Fields",
								"Final Stage: Land in Flush Factory"
							],
							pins: [
								{ id: "s6_w1_c5_p1", location: "junkJunction", image: "glider" },
								{ id: "s6_w1_c5_p2", location: "tomatoTemple", image: "glider" },
								{ id: "s6_w1_c5_p3", location: "tiltedTowers", image: "glider" },
								{ id: "s6_w1_c5_p4", location: "fatalFields", image: "glider" },
								{ id: "s6_w1_c5_p5", location: "flushFactory", image: "glider" }
							]
						},
						{
							id: "s6_w1_c6",
							type: "progress",
							description: "Dance under 7 different Streetlight Spotlights",
							amount: 7,
							pinType: "multi",
							pins: [
								{ id: "s6_w1_c6_p1", x: 900, y: 384, image: "streetLight" },
								{ id: "s6_w1_c6_p2", x: 1162, y: 398, image: "streetLight" },
								{ id: "s6_w1_c6_p3", x: 1618, y: 430, image: "streetLight" },
								{ id: "s6_w1_c6_p4", x: 618, y: 586, image: "streetLight" },
								{ id: "s6_w1_c6_p5", x: 1652, y: 876, image: "streetLight" },
								{ id: "s6_w1_c6_p6", x: 518, y: 1070, image: "streetLight" },
								{ id: "s6_w1_c6_p7", x: 802, y: 1084, image: "streetLight" },
								{ id: "s6_w1_c6_p8", x: 872, y: 1116, image: "streetLight" },
								{ id: "s6_w1_c6_p9", x: 1230, y: 1046, image: "streetLight" },
								{ id: "s6_w1_c6_p10", x: 1672, y: 1196, image: "streetLight" },
								{ id: "s6_w1_c6_p11", x: 1646, y: 1486, image: "streetLight" },
								{ id: "s6_w1_c6_p12", x: 1348, y: 1698, image: "streetLight" },
								{ id: "s6_w1_c6_p13", x: 980, y: 1840, image: "streetLight" },
								{ id: "s6_w1_c6_p14", x: 1534, y: 1898, image: "streetLight" },
								{ id: "s6_w1_c6_p15", x: 1914, y: 1830, image: "streetLight" }
							]
						},
						{
							id: "s6_w1_c7",
							type: "progress",
							description: "Eliminate opponents in 5 different Named Locations",
							amount: 5,
							pinType: "multi",
							pins: allNamedLocations("s6_w1_c7", "kill")
						},
						{
							id: "s6_w1_c8",
							type: "hidden",
							description: "Find the secret Battle Star",
							pin: { id: "s6_w1_c8_p1", x: 1990, y: 1658, image: "star" }
						}
					]
				},
				{
					id: "s6_w2",
					name: "Week 2",
					challenges: [
						{
							id: "s6_w2_c1",
							type: "progress",
							description: "Visit all the corrupted areas",
							amount: 7,
							pinType: "multi",
							pins: [
								{ id: "s6_w2_c1_p1", x: 496, y: 824, image: "corruption" },
								{ id: "s6_w2_c1_p2", x: 1186, y: 694, image: "corruption" },
								{ id: "s6_w2_c1_p3", x: 1750, y: 734, image: "corruption" },
								{ id: "s6_w2_c1_p4", x: 1164, y: 1214, image: "corruption" },
								{ id: "s6_w2_c1_p5", x: 674, y: 1448, image: "corruption" },
								{ id: "s6_w2_c1_p6", x: 1254, y: 1580, image: "corruption" },
								{ id: "s6_w2_c1_p7", x: 1740, y: 1300, image: "corruption" }
							]
						},
						{
							id: "s6_w2_c2",
							type: "simple",
							description: "Use a Shadow Stone in 3 different matches"
						},
						{
							id: "s6_w2_c3",
							type: "staged",
							descriptions: [
								"Stage 1: Deal 200 damage with Assault Rifles to opponents",
								"Stage 2: Deal 200 damage with Burst Rifles to opponents",
								"Final Stage: Deal 200 damage with Silenced Rifles to opponents"
							]
						},
						{
							id: "s6_w2_c4",
							type: "simple",
							description: "Eliminate an opponent from at least 50M away",
							pinType: "none"
						},
						{
							id: "s6_w2_c5",
							type: "simple",
							description: "Deal 500 damage with Pistols to opponents",
							pinType: "none"
						},
						{
							id: "s6_w2_c6",
							type: "simple",
							description: "Eliminate 3 opponents with SMGs",
							pinType: "none"
						},
						{
							id: "s6_w2_c7",
							type: "staged",
							descriptions: [
								"Stage 1: Deal 200 damage with Hunting Rifles to opponents",
								"Stage 2: Deal 200 damage with Bolt Rifles to opponents",
								"Final Stage: Deal 200 damage with Heavy Rifles to opponents"
							]
						},
						{
							id: "s6_w2_c8",
							type: "hidden",
							description: "Find the Hidden Banner",
							pin: { id: "s6_w2_c8_p1", x: 1808, y: 1556, image: "star" }
						}
					]
				},
				{
					id: "s6_w3",
					name: "Week 3",
					challenges: [
						{
							id: "s6_w3_c1",
							type: "simple",
							description: "Revive a player in 5 different matches",
							pinType: "none"
						},
						{
							id: "s6_w3_c2",
							type: "staged",
							descriptions: [
								"Stage 1: Search a Chest in Lonely Lodge",
								"Stage 2: Search a Chest in Retail Row",
								"Stage 3: Search a Chest in Snobby Shores",
								"Stage 4: Search a Chest in Fatal Fields",
								"Final Stage: Search a Chest in Pleasant Park"
							],
							pins: [
								{ id: "s6_w3_c2_p1", location: "lonelyLodge", image: "chest" },
								{ id: "s6_w3_c2_p2", location: "retailRow", image: "chest" },
								{ id: "s6_w3_c2_p3", location: "snobbyShores", image: "chest" },
								{ id: "s6_w3_c2_p4", location: "fatalFields", image: "chest" },
								{ id: "s6_w3_c2_p5", location: "pleasantPark", image: "chest" }
							]
						},
						{
							id: "s6_w3_c3",
							type: "simple",
							description: "Eliminate a player with a Damage Trap",
							pinType: "none"
						},
						{
							id: "s6_w3_c4",
							type: "staged",
							descriptions: [
								"Stage 1: Visit Risky Reels and Wailing Woods in the same match",
								"Stage 2: Visit Paradise Palms and Dusty Divot in the same match",
								"Stage 3: Visit Greasy Grove and Leaky Lake in the same match",
								"Stage 4: Visit Lucky Landing and Tilted Towers in the same match",
								"Final Stage: Visit Snobby Shores and Salty Springs in the same match"
							],
							pins: [
								{
									id: "s6_w3_c4_p1",
									location: "riskyReels",
									image: "flag",
									links: [{ location: "wailingWoods", image: "flag" }]
								},
								{
									id: "s6_w3_c4_p2",
									location: "paradisePalms",
									image: "flag",
									links: [{ location: "dustyDivot", image: "flag" }]
								},
								{
									id: "s6_w3_c4_p3",
									location: "greasyGrove",
									image: "flag",
									links: [{ location: "leakyLake", image: "flag" }]
								},
								{
									id: "s6_w3_c4_p4",
									location: "luckyLanding",
									image: "flag",
									links: [{ location: "tiltedTowers", image: "flag" }]
								},
								{
									id: "s6_w3_c4_p5",
									location: "snobbyShores",
									image: "flag",
									links: [{ location: "saltySprings", image: "flag" }]
								}
							]
						},
						{
							id: "s6_w3_c5",
							type: "simple",
							description: "Hit a player with a Tomato from at least 15M away",
							pinType: "none"
						},
						{
							id: "s6_w3_c6",
							type: "progress",
							description: "Complete 3 Timed Trials",
							amount: 3,
							pinType: "multi",
							pins: [
								{ id: "s6_w3_c6_p1", x: 1508, y: 708, image: "timeTrial" },
								{ id: "s6_w3_c6_p2", x: 358, y: 900, image: "timeTrial" },
								{ id: "s6_w3_c6_p3", x: 1142, y: 1098, image: "timeTrial" },
								{ id: "s6_w3_c6_p4", x: 842, y: 1228, image: "timeTrial" },
								{ id: "s6_w3_c6_p5", x: 908, y: 1558, image: "timeTrial" }
							]
						},
						{
							id: "s6_w3_c7",
							type: "simple",
							description: "Eliminate an opponent in 10 different matches",
							pinType: "none"
						}
					]
				},
				{
					id: "s6_w4",
					name: "Week 4",
					challenges: [
						{
							id: "s6_w4_c1",
							type: "simple",
							description: "Use a Port-a-Fort or Port-a-Fortress in 5 different matches",
							pinType: "none"
						},
						{
							id: "s6_w4_c2",
							type: "progress",
							description: "Search an Ammo Box in 7 different Named namedLocations",
							amount: 7,
							pinType: "multi",
							pins: allNamedLocations("s6_w4_c2", "ammo")
						},
						{
							id: "s6_w4_c3",
							type: "simple",
							description: "Ring the doorbell of a house with an opponent inside in 3 different matches",
							pinType: "none"
						},
						{
							id: "s6_w4_c4",
							type: "staged",
							descriptions: [
								"Stage 1: Land in Greasy Grove",
								"Stage 2: Land in Wailing Woods",
								"Stage 3: Land in Dusty Divot",
								"Stage 4: Land in Pleasant Park",
								"Final Stage: Land in Paradise Palms"
							],
							pins: [
								{ id: "s6_w4_c4_p1", location: "greasyGrove", image: "glider" },
								{ id: "s6_w4_c4_p2", location: "wailingWoods", image: "glider" },
								{ id: "s6_w4_c4_p3", location: "dustyDivot", image: "glider" },
								{ id: "s6_w4_c4_p4", location: "pleasantPark", image: "glider" },
								{ id: "s6_w4_c4_p5", location: "paradisePalms", image: "glider" }
							]
						},
						{
							id: "s6_w4_c5",
							type: "simple",
							description: "Dance on top of a clock tower",
							pinType: "none"
						},
						{
							id: "s6_w4_c6",
							type: "progress",
							description: "Get a score of 3 or more at 5 different shooting galleries",
							amount: 5,
							pinType: "multi",
							pins: [
								{ id: "s6_w4_c6_p1", x: 570, y: 480, image: "target" },
								{ id: "s6_w4_c6_p2", x: 1830, y: 358, image: "target" },
								{ id: "s6_w4_c6_p3", x: 1940, y: 672, image: "target" },
								{ id: "s6_w4_c6_p4", x: 1258, y: 1004, image: "target" },
								{ id: "s6_w4_c6_p5", x: 406, y: 1170, image: "target" },
								{ id: "s6_w4_c6_p6", x: 1742, y: 1430, image: "target" },
								{ id: "s6_w4_c6_p7", x: 1150, y: 1770, image: "target" }
							]
						},
						{
							id: "s6_w4_c7",
							type: "simple",
							description: "Eliminate 3 opponents near corrupted areas",
							pinType: "none"
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
