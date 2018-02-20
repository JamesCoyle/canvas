export default class Transform
{
	constructor()
	{
		this._queue = [];
	}

	add(transform)
	{
		this._queue = this._queue.concat(transform._queue);

		return this;
	}

	rotate(angle)
	{
		this._queue.push(new Rotate(angle));

		return this;
	}

	translate(x, y)
	{
		this._queue.push(new Translate(x, y));

		return this;
	}

	translateX(x)
	{
		this.translate(x, 0);

		return this;

	}

	translateY(y)
	{
		this.translate(0, y);

		return this;

	}

	translateAngle(angle, dist)
	{
		this.translate(Math.sin(angle) * dist, Math.cos(angle) * dist);

		return this;

	}

	scale(x, y)
	{
		if (typeof y === 'undefined')
			y = x;

		this._queue.push(new Scale(x, y));

		return this;

	}

	scaleX(x)
	{
		this.scaleX(x, 1);

		return this;

	}

	scaleY(y)
	{
		this.scaleY(1, y);

		return this;

	}

	applyTo(ctx)
	{
		this._queue.forEach((transform) =>
		{
			transform.applyTo(ctx);
		});
	}
}

class Rotate
{
	constructor(angle)
	{
		if (typeof angle !== 'object')
			angle = {
				value: angle
			};

		this.angle = angle;
	}

	applyTo(ctx)
	{
		ctx.rotate(this.angle.value);
	}
}

class Translate
{
	constructor(x, y)
	{
		if (typeof x !== 'object')
			x = {
				value: x
			};

		if (typeof y !== 'object')
			y = {
				value: y
			};

		this.x = x;
		this.y = y;
	}

	applyTo(ctx)
	{
		ctx.translate(this.x.value, this.y.value);
	}
}

class Scale
{
	constructor(x, y)
	{
		if (typeof x !== 'object')
			x = {
				value: x
			};

		if (typeof y !== 'object')
			y = {
				value: y
			};

		this.x = x;
		this.y = y;
	}

	applyTo(ctx)
	{
		ctx.scale(this.x.value, this.y.value);
	}
}
