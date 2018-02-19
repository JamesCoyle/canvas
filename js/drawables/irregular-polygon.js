import
{
	PathDrawable
}
from '../types/drawable.js';

export default class IrregularPolygon extends PathDrawable
{
	constructor(center, radius, verteces, rotation = 0)
	{
		super();

		this.center = center;
		this.radius = radius;
		this.verteces = verteces;
		this.rotation = rotation;
	}

	drawPath(ctx)
	{
		let angle = this.rotation,
			x = Math.sin(angle) * this.radius,
			y = -Math.cos(angle) * this.radius;

		ctx.moveTo(x, y);

		for (let i = 0; i < this.verteces.length; ++i)
		{
			ctx.lineTo(this.verteces[i].x, this.verteces[i].y);
		}
	}
}
