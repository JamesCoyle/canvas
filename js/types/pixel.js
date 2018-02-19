export default class
{
	constructor(position, color)
	{
		this.position = position;
		this.color = color;
	}

	draw(ctx)
	{
		ctx.fillStyle = this.color.rgba;
		ctx.fillRect(this.position.x, this.position.y, 1, 1);
	}
}
