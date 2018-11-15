export class Rectangle {
	private x: number;
	private y: number;

	constructor(x: number, y: number);
	constructor(x: number, y: number, width: number, height: number);
	constructor(x: number, y: number, width?: number, height?: number) {
		this.x = x;
		this.y = y;
	}
}
