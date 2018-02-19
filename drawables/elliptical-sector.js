import EllipticalSegment from './elliptical-segment.js';

export default class extends EllipticalSegment
{
	drawPath(ctx)
	{
		super.drawPath(ctx);
		ctx.lineTo(this.position.x, this.position.y);
	}
}
