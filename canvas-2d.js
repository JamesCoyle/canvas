import Point from './types/point.js';

export default class
{
	static from(el)
	{
		this.canvas = el;
		this.ctx = this.canvas.getContext('2d');
	}

	get width()
	{
		return this.canvas.width;
	}

	set width(width)
	{
		this.canvas.width = width;
	}

	get height()
	{
		return this.canvas.height;
	}

	set height(height)
	{
		this.canvas.height = height;
	}

	get center()
	{
		return new Point(this.canvas.width / 2, this.canvas.height / 2);
	}

	constructor(width, height, parent, fallback = 'Not supported')
	{
		// create canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = width;
		this.canvas.height = height;
		this.canvas.innerHTML = fallback;

		// append to dom
		if (parent instanceof Element)
			parent.appendChild(this.canvas);

		// get 2d context
		this.ctx = this.canvas.getContext('2d');
	}

	// store update function
	update(callback)
	{
		this._updateCallback = callback;

		// allow chaining
		return this;
	}

	// store draw function
	draw(callback)
	{
		this._drawCallback = callback;

		// allow chaining
		return this;
	}

	// start animating
	start()
	{
		requestAnimationFrame((frameTime) =>
		{
			this._loop(frameTime, true)
		});

		return this;
	}

	pause()
	{
		this.paused = true;

		return this;
	}

	resume()
	{
		this.paused = false;
		this.start();

		return this;
	}

	_loop(frameTime, initial = false)
	{
		if (initial || frameTime - this._lastFrame > 200 || typeof this._lastFrame === 'undefined')
			this._lastFrame = frameTime;

		// clear canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// update
		this._updateCallback(this.ctx, frameTime - this._lastFrame);
		this._drawCallback(this.ctx);

		// request draw
		if (!this.paused)
			requestAnimationFrame(this._loop.bind(this));

		// store delta
		this._lastFrame = frameTime;
	}
}
