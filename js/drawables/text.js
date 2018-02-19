import
{
	TextStyle
}
from '../types/drawable.js';

export default class extends TextDrawable
{
	get center()
	{
		// TODO: calculate center
		return 'Not available';
	}

	constructor(position, text)
	{
		super();

		this.position = position;
		this.text = text;
	}

	drawText(ctx)
	{
		ctx.fillText(this.text, this.position.x, this.position.y);
		ctx.strokeText(this.text, this.position.x, this.position.y);
	}
}

class SVGText extends TextDrawable
{
	constructor(position, text)
	{
		super();

		// TODO: create an svg element to render text along a path
	}
}

class DOMText extends TextDrawable
{
	constructor(position, text)
	{
		super();

		// TODO: create an html element to render text in a block
	}
}
