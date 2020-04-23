import { map } from "./map";
import { Position } from "./map/position";
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

	// A timeout is used here to allow the styling to take place before the map is sized.
	setTimeout(updateMapSize, 1);

	window.onresize = () => {
		updateMapSize();
	};

	const tracker = new Tracker(challengeData, challengesContainer);

	let drag = false;
	let pinch = false;
	const prevTouch: Position = new Position(0, 0);
	const prevTouch2: Position = new Position(0, 0);
	let previousDistance = 0;

	canvas.addEventListener("mousedown", (event) => {
		drag = true;
		prevTouch.setPosition(event.clientX, event.clientY);
	});

	const touchStart = (event) => {
		const touch = event.touches[0];
		prevTouch.setPosition(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop);
		if (event.touches.length === 1) {
			drag = true;
		} else {
			drag = false;
			pinch = true;
			const touch2 = event.touches[1];
			prevTouch2.setPosition(touch2.pageX - canvas.offsetLeft, touch2.pageY - canvas.offsetTop);
			previousDistance = prevTouch.getDistance(prevTouch2);
		}
	};
	canvas.addEventListener("touchstart", touchStart);

	window.addEventListener("mouseup", (event) => {
		drag = false;
	});
	const touchEnd = (event) => {
		drag = false;
		pinch = false;
	};
	window.addEventListener("touchend", touchEnd);

	window.addEventListener("mousemove", (event) => {
		if (!drag) {
			return;
		}
		map.moveX(event.clientX - prevTouch.getX());
		map.moveY(event.clientY - prevTouch.getY());
		prevTouch.setPosition(event.clientX, event.clientY);

		map.triggerUpdate();
	});

	const touchMove = (event) => {
		const touch = event.touches[0];
		if (drag) {
			map.moveX(touch.pageX - canvas.offsetLeft - prevTouch.getX());
			map.moveY(touch.pageY - canvas.offsetTop - prevTouch.getY());
			prevTouch.setPosition(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop);
			map.triggerUpdate();
		} else if (pinch) {
			const touch2 = event.touches[1];
			const oldCenter = prevTouch.getCenterPosition(prevTouch2);
			prevTouch.setPosition(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop);
			prevTouch2.setPosition(touch2.pageX - canvas.offsetLeft, touch2.pageY - canvas.offsetTop);
			const newCenter = prevTouch.getCenterPosition(prevTouch2);
			const newDistance = prevTouch.getDistance(prevTouch2);
			const change = newDistance / previousDistance;
			map.adjustZoom(map.zoom * change - map.zoom, oldCenter.getX(), oldCenter.getY());
			map.moveX(newCenter.getX() - oldCenter.getX());
			map.moveY(newCenter.getY() - oldCenter.getY());
			// map.zoom = map.zoom * change;
			previousDistance = newDistance;
			map.triggerUpdate();
		}
	};
	canvas.addEventListener("touchmove", touchMove);
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
