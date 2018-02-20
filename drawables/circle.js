import
{
	PathDrawable
}
from '../types/drawable.js';

export default class extends PathDrawable
{
	constructor(center, radius)
	{
		super();

		this._position = center;
		this.radius = radius;
	}

	drawPath(ctx)
	{
		ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
	}
}
