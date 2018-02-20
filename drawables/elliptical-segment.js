import Ellipse from './ellipse.js';

export default class extends Ellipse
{
	constructor(center, radiusX, radiusY, rotation = 0, sector = Math.PI * 2, sectorOffset = 0)
	{
		super(center, radiusX, radiusY, rotation = 0);

		this.sector = sector;
		this.sectorOffset = sectorOffset
	}

	drawPath(ctx)
	{
		ctx.ellipse(this._position.x, this._position.y, this.radiusX, this.radiusY, this.rotation, this.sectorOffset, this.sector);
	}
}
