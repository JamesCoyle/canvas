import Circle from './circle.js';

export default class extends Circle
{
	constructor(center, radius, rotation = 0, angle = Math.PI * 2)
	{
		super(center, radius);

		this.rotation = rotation;
		this.angle = angle;
	}

	drawPath(ctx)
	{
		ctx.arc(this.position.x, this.position.y, this.radius, this.rotation, this.angle);
	}
}
