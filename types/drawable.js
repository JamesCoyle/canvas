import Color from './color.js';
import Transform from './transform.js';

class Drawable
{
	get center()
	{
		return Point.from(this._position);
	}

	constructor()
	{
		this._fill = Color.DEFAULT;
		this._stroke = Color.DEFAULT;
		this._strokeWidth = 0;
	}

	move(vector)
	{
		this._position.add(vector);

		return this;
	}

	fill(color)
	{
		if (color instanceof Color)
			this._fill = color;
		else
			this._fill = new Color(color);

		return this;
	}

	stroke(color, width)
	{
		if (color instanceof Color)
			this._stroke = color;
		else
			this._stroke = new Color(color);

		this._strokeWidth = width;

		return this;
	}

	transform(transform)
	{
		this._transform = transform;

		return this;
	}

	clearTransform()
	{
		this._transform = undefined;

		return this;
	}

	_preDraw(ctx)
	{
		// save canvas position
		ctx.save();

		// apply styles
		ctx.fillStyle = this._fill.rgba;
		ctx.strokeStyle = this._stroke.rgba;
		ctx.lineWidth = this._strokeWidth;

		// move to center of object
		ctx.translate(this.center.x, this.center.y);

		// apply transform
		if (typeof this._transform !== 'undefined')
			this._transform.applyTo(ctx);
	}

	_postDraw(ctx)
	{
		// restore canvas
		ctx.restore();
	}
}

export class PathDrawable extends Drawable
{
	draw(ctx)
	{
		this._preDraw(ctx);

		ctx.beginPath();
		this.drawPath(ctx);
		ctx.fill();
		ctx.stroke();

		this._postDraw(ctx);

		return this;
	}
}

export class TextDrawable extends Drawable
{
	constructor()
	{
		super();

		this._align = 'start';
		this._valign = 'alphabetic';
	}

	font(size, family, weight = 'normal', style = 'normal', variant = 'normal')
	{
		this._font = `${weight} ${style} ${variant} ${size} ${family}`;

		return this;
	}

	align(align, valign)
	{
		this._align = align;
		this._valign = valign;

		return this;
	}

	draw(ctx)
	{
		this._preDraw(ctx);

		ctx.textAlign = this._align;
		ctx.textBaseline = this._valign;
		ctx.font = this._font;

		this.drawText(ctx);

		this._postDraw(ctx);

		return this;
	}
}

export class ImageDrawable extends Drawable
{
	draw(ctx)
	{
		this._preDraw(ctx);

		this.drawImage(ctx);

		this._postDraw(ctx);

		return this;
	}
}
