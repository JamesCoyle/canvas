import
{
	ImageDrawable
}
from '../types/drawable.js';

export default class extends ImageDrawable
{
	get center()
	{
		return this.destination.center;
	}

	get position()
	{
		return this.destination.position;
	}

	constructor(image, destination, source)
	{
		super();

		if (typeof image !== 'object')
		{
			this.image = document.createElement('img');
			this.image.src = image;
		}
		else
			this.image = image;

		this.destination = destination;
		this.source = source;
	}

	drawImage(ctx)
	{
		let dx = -this.destination.width / 2,
			dy = -this.destination.height / 2,
			dw = this.destination.width,
			dh = this.destination.height,
			sx = 0,
			sy = 0,
			sw = this.image.width,
			sh = this.image.height;

		if (typeof this.source !== 'undefined')
		{
			sx = this.source.x;
			sy = this.source.y;
			sw = this.source.width;
			sh = this.source.height;
		}

		ctx.rotate(this.rotation);
		ctx.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
	}
}
