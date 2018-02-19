import Point from './point.js';

export default class Vector extends Point
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
}
