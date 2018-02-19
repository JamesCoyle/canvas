import Point from '../types/point.js';
import Vector from '../types/vector.js';
import
{
	PathDrawable
}
from '../types/drawable.js';

export default class Rectangle extends PathDrawable
{
	static fromSquare(square)
	{
		return new Rectangle(square.center, square.scale, square.scale);
	}

	static fromTopLeft(position, width, height, rotation = 0)
	{
		return new Rectangle(position, width, height, rotation, new Vector(width / 2, height / 2));
	}

	static fromTopRight(position, width, height, rotation = 0)
	{
		return new Rectangle(position, width, height, rotation, new Vector(-width / 2, height / 2));
	}

	static fromBottomLeft(position, width, height, rotation = 0)
	{
		return new Rectangle(position, width, height, rotation, new Vector(width / 2, -height / 2));
	}

	static fromBottomRight(position, width, height, rotation = 0)
	{
		return new Rectangle(position, width, height, rotation, new Vector(-width / 2, -height / 2));
	}

	get center()
	{
		return Point.from(this.position).add(this.offset);
	}

	constructor(center, width, height, rotation = 0, offset = Vector.ZERO)
	{
		super();

		this.position = center;
		this.width = width;
		this.height = height;
		this.rotation = rotation;
		this.offset = offset;
	}

	drawPath(ctx)
	{
		ctx.rotate(this.rotation);
		ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
	}
}
