import EllipticalSegment from './elliptical-segment.js';

export default class extends EllipticalSegment
{
	drawPath(ctx)
	{
		super.drawPath(ctx);
		ctx.lineTo(this._position.x, this._position.y);
	}
}
