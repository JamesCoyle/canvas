import
{
	PathDrawable
}
from '../types/drawable.js';

export default class Polygon extends PathDrawable
{
	constructor(center, radius, verteces, rotation = 0)
	{
		super();

		this._position = center;
		this.radius = radius;
		this.verteces = verteces;
		this.rotation = rotation;
	}

	drawPath(ctx)
	{
		let angle = this.rotation,
			step = Math.PI * 2 / this.verteces,
			x = Math.sin(angle) * this.radius,
			y = -Math.cos(angle) * this.radius;

		ctx.moveTo(x, y);

		for (let i = 0; i < this.verteces; ++i)
		{
			angle += step;
			x = Math.sin(angle) * this.radius;
			y = -Math.cos(angle) * this.radius;

			ctx.lineTo(x, y);
		}
	}
}
