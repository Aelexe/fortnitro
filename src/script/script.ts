import { map } from "./map";
import { Tracker } from "./tracker";
import challengeData from "./data/challenge-data";

const createPage = () => {
	document.getElementById("info-button").addEventListener("click", () => {
		alert(
			"This site is not affiliated with Epic Games or Fortnite." +
				"\nAll trademarks referenced herein are the properties of their respective owners." +
				"\n\nAlso sorry for the alert box. I'll make something nicer later."
		);
	});
	const challengesContainer = document.getElementById("challenges-container");
	const canvasContainer = document.getElementById("canvas-container");

	const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
	const context: CanvasRenderingContext2D = canvas.getContext("2d");

	map.initialise(canvas, context);
	map.loadImage();

	const updateMapSize = () => {
		map.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
	};

	updateMapSize();

	window.onresize = () => {
		updateMapSize();
	};

	const tracker = new Tracker(challengeData, challengesContainer);

	let drag = false;
	let dragX: number;
	let dragY: number;

	canvas.addEventListener("mousedown", (event) => {
		drag = true;
		dragX = event.clientX;
		dragY = event.clientY;
	});
	canvas.addEventListener("touchstart", (event) => {
		map.enableZoomButtons();
		drag = true;
		const touch = event.touches[0];
		dragX = touch.clientX;
		dragY = touch.clientY;
	});

	window.addEventListener("mouseup", (event) => {
		drag = false;
	});
	window.addEventListener("touchend", (event) => {
		drag = false;
	});

	window.addEventListener("mousemove", (event) => {
		if (!drag) {
			return;
		}
		map.moveX(event.clientX - dragX);
		map.moveY(event.clientY - dragY);
		dragX = event.clientX;
		dragY = event.clientY;

		map.triggerUpdate();
	});
	window.addEventListener("touchmove", (event) => {
		if (!drag) {
			return;
		}
		const touch = event.touches[0];
		map.moveX(touch.clientX - dragX);
		map.moveY(touch.clientY - dragY);
		dragX = touch.clientX;
		dragY = touch.clientY;
		map.triggerUpdate();
	});
	canvas.addEventListener("mousemove", (event) => {
		map.hover(event.offsetX, event.offsetY);
	});
	canvas.addEventListener("mouseout", (event) => {
		map.hover(-1000, -1000);
	});
	canvas.addEventListener("click", (event) => {
		map.click(event.offsetX, event.offsetY);
	});
	canvas.addEventListener("wheel", (event) => {
		event.preventDefault();

		const zoomChange = -event.deltaY;

		if (zoomChange > 0) {
			map.zoomIn(event.offsetX, event.offsetY);
		} else if (zoomChange < 0) {
			map.zoomOut(event.offsetX, event.offsetY);
		}
	});
};

if (document.readyState === "complete") {
	createPage();
} else {
	window.onload = createPage;
}
