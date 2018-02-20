export default class Point
{
	static get ZERO()
	{
		return new Point(0, 0);
	}

	static from(point)
	{
		return new Point(point.x, point.y);
	}

	constructor(x, y)
	{
		this.x = x;
		this.y = y;

		if (typeof this.x === 'undefined') this.x = 0;
		if (typeof this.y === 'undefined') this.y = 0;
	}

	add(vector, scale = 1)
	{
		this.x += vector.x * scale;
		this.y += vector.y * scale;

		return this;
	}

	distanceFrom(point)
	{
		return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
	}
}
