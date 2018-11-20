import { map } from "./map/map";
import { Pin } from "./map/pin";
import { prompt } from "./tracker/prompt";
import { Tracker } from "./tracker";
import challengeData from "./data/challenge-data";

const createPage = () => {
	prompt.hide();
	const canvasContainer = document.getElementById("canvas-container");
	canvasContainer.insertBefore(prompt.element, canvasContainer.childNodes[0]);

	const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
	const context: CanvasRenderingContext2D = canvas.getContext("2d");

	map.initialise(canvas, context);
	map.loadImage();

	const updateMapSize = () => {
		map.setSize(canvasContainer.clientHeight);
	};

	updateMapSize();

	window.onresize = () => {
		updateMapSize();
	};

	const tracker = new Tracker(challengeData, document.getElementById("challenges-container"));

	const width = window.innerWidth;
	const height = window.innerHeight;

	let drag = false;
	let dragX: number;
	let dragY: number;

	canvas.addEventListener("mousedown", (event) => {
		drag = true;
		dragX = event.clientX;
		dragY = event.clientY;

		prompt.removeConfirmCallback();
		prompt.hide();
	});
	window.addEventListener("mouseup", (event) => {
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
