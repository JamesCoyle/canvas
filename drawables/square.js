import Vector from '../types/vector.js';
import
{
	PathDrawable
}
from '../types/drawable.js';

export default class Square extends PathDrawable
{
	static fromTopLeft(position, size)
	{
		let half = size / 2;
		return new Square(position, size, new Vector(half, half));
	}

	static fromTopRight(position, size)
	{
		let half = size / 2;
		return new Square(position, size, new Vector(-half, half));
	}

	static fromBottomLeft(position, size)
	{
		let half = size / 2;
		return new Square(position, size, new Vector(half, -half));
	}

	static fromBottomRight(position, size)
	{
		let half = size / 2;
		return new Square(position, size, new Vector(-half, -half));
	}

	get center()
	{
		return Point.from(this._position).add(this.offset);
	}

	constructor(position, size, rotation = 0, offset = Vector.ZERO)
	{
		super();

		this._position = position;
		this.size = size;
		this.rotation = rotation;
		this.offset = offset;
	}

	drawPath(ctx)
	{
		ctx.rotate(this.rotation);
		ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
	}
}
