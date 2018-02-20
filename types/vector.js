export default class Vector
{
	static get ZERO()
	{
		return new Vector(0, 0);
	}

	static fromAngle(angle, magnitude)
	{
		return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
	}

	get magnitude()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	get angle()
	{
		return Math.atan2(this.y, this.x);
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

	scale(scale)
	{
		this.x *= scale;
		this.y *= scale;

		return this;
	}
}
