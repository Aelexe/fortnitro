export class Position {
	private x: number;
	private y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public getX(): number {
		return this.x;
	}

	public setX(x: number) {
		this.x = x;
	}

	public getY(): number {
		return this.y;
	}

	public setY(y: number) {
		this.y = y;
	}

	public setPosition(x: number, y: number) {
		this.setX(x);
		this.setY(y);
	}

	public getCenterPosition(position: Position) {
		return new Position((position.x + this.x) / 2, (position.y + this.y) / 2);
	}

	public getDistance(position: Position): number {
		return Math.sqrt(Math.pow(position.x - this.x, 2) + Math.pow(position.y - this.y, 2));
	}
}
