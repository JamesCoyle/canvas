import CircularSegment from './circular-segment.js';

export default class extends CircularSegment
{
	constructor(center, radius, rotation = 0, angle = Math.PI * 2)
	{
		super(center, radius);

		this.rotation = rotation;
		this.angle = angle;
	}

	drawPath(ctx)
	{
		ctx.arc(this._position.x, this._position.y, this.radius, this.rotation, this.angle);
	}
}
