import
{
	PathDrawable
}
from '../types/drawable.js';

export default class extends PathDrawable
{
	constructor(center, radiusX, radiusY, rotation = 0)
	{
		super();

		this.position = center;
		this.radiusX = radiusX;
		this.radiusY = radiusY;
		this.rotation = rotation;
	}

	drawPath(ctx)
	{
		ctx.ellipse(this.position.x, this.position.y, this.radiusX, this.radiusY, this.rotation, Math.PI * 2, 0);
	}
}
