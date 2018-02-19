export default class Color
{
	static from(color)
	{
		return Color.fromHSL(color.hue, color.saturation, color.luminosity, color.alpha);
	}

	static fromRGB(r, g, b, a = 1)
	{
		return new Color(`rgba(${r}, ${g}, ${b}, ${a})`);
	}

	static fromHSL(h, s, l, a = 1)
	{
		return new Color(`hsla(${h}, ${s * 100}%, ${l * 100}%, ${a})`);
	}

	static get Default()
	{
		return new Color('rgba(0, 0, 0, 0)');
	}

	get rgb()
	{
		return `rgb(${this.red}, ${this.green}, ${this.blue})`;
	}

	get rgba()
	{
		return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
	}

	get hsl()
	{
		return `hsl(${this.hue}, ${this.saturation * 100}%, ${this.luminosity * 100}%)`;
	}

	get hsla()
	{
		return `hsla(${this.hue}, ${this.saturation * 100}%, ${this.luminosity * 100}%, ${this.alpha})`;
	}

	get hex()
	{
		return `#${this.red.toString(16)}${this.green.toString(16)}${this.blue.toString(16)}`;
	}

	constructor(string)
	{
		// get color value from string
		document.head.style.color = string;
		let color = getComputedStyle(document.head).color.match(/\d+/g);

		// store returned rgb value
		[this.red, this.green, this.blue] = color;
		this.alpha = (typeof color[3] !== 'undefined') ? color[3] : 1;

		// store the hsl value too
		this._rgb2hsl();
	}

	/* === hue changes === */

	rotate(angle)
	{
		this.hue += angle;
		this._hsl2rgb();

		return this;
	}

	complimentary()
	{
		this.hue += 180;
		this.hue %= 360;
		this._hsl2rgb();

		return this;
	}

	/* === saturation changes === */

	saturate(amount)
	{
		this.saturation += amount;
		this._hsl2rgb();

		return this;
	}

	desaturate(amount)
	{
		this.saturation -= amount;
		this._hsl2rgb();

		return this;
	}

	grayscale()
	{
		this.saturation = 0;
		this._hsl2rgb();

		return this;
	}

	/* === luminosity changes === */

	lighten(amount)
	{
		this.luminosity += amount;
		this._hsl2rgb();

		return this;
	}

	darken(amount)
	{
		this.luminosity -= amount;
		this._hsl2rgb();

		return this;
	}

	invert()
	{
		this.luminosity = 1 - this.luminosity;
		this._hsl2rgb();

		return this;
	}

	/* === alpha changes === */

	transparentize(amount)
	{
		this.alpha -= amount;

		return this;
	}

	opacify(amount)
	{
		this.alpha += amount;

		return this;
	}

	/* === helper functions === */

	_rgb2hsl()
	{
		let r = this.red / 255,
			g = this.green / 255,
			b = this.blue / 255,
			max = Math.max(r, g, b),
			min = Math.min(r, g, b),
			h,
			s,
			l = (max + min) / 2;

		if (max == min)
		{
			h = s = 0; // achromatic
		}
		else
		{
			let d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max)
			{
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		this.hue = h * 360;
		this.saturation = s;
		this.luminosity = l;
	}

	_hsl2rgb()
	{
		let r, g, b,
			h = this.hue / 360,
			s = this.saturation,
			l = this.luminosity;

		if (s == 0)
		{
			r = g = b = l; // achromatic
		}
		else
		{
			var hue2rgb = function hue2rgb(p, q, t)
			{
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			}

			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}

		this.red = Math.round(r * 255);
		this.green = Math.round(g * 255);
		this.blue = Math.round(b * 255);
	}
}
