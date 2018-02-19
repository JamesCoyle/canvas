import Point from './point.js';

export default class Line
{
	get length()
	{
		return this.start.distanceFrom(this.end);
	}

	constructor(start, end)
	{
		this.start = start;
		this.end = end;
	}

	distanceFrom(point)
	{
		let diffX = this.end.x - this.start.x,
			diffY = this.end.x - this.start.x;

		let area = Math.abs(diffY * point.x - diffX * point.y + this.end.x * this.start.y - this.start.x * this.end.y);

		// REVIEW: might not work for horizontal/vertical lines

		return area / this.length;
	}

	getPointAt(percentage)
	{
		return new Point(
			(this.end.x - this.start.x) * percentage + this.start.x,
			(this.end.y - this.start.y) * percentage + this.start.y
		);
	}
}
