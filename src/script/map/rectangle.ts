export class Rectangle {
	private x: number;
	private y: number;
	private width: number;
	private height: number;

	constructor(x: number, y: number);
	constructor(x: number, y: number, width: number, height: number);
	constructor(x: number, y: number, width: number = 0, height: number = 0) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	public containsPoint(x: number, y: number): boolean {
		return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
	}
}
