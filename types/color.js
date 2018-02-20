export default class Color
{
	static from(color)
	{
		return Color.fromHSL(color.hue, color.saturation, color.lightness, color.alpha);
	}

	static fromRGB(r, g, b, a = 1)
	{
		return new Color(`rgba(${r}, ${g}, ${b}, ${a})`);
	}

	static fromHSL(h, s, l, a = 1)
	{
		return new Color(`hsla(${h}, ${s * 100}%, ${l * 100}%, ${a})`);
	}

	static get DEFAULT()
	{
		return new Color('rgba(0, 0, 0, 0)');
	}

	get rgb()
	{
		return `rgb(${this._red}, ${this._green}, ${this._blue})`;
	}

	get rgba()
	{
		return `rgba(${this._red}, ${this._green}, ${this._blue}, ${this._alpha})`;
	}

	get hsl()
	{
		return `hsl(${this._hue}, ${this._saturation * 100}%, ${this._lightness * 100}%)`;
	}

	get hsla()
	{
		return `hsla(${this._hue}, ${this._saturation * 100}%, ${this._lightness * 100}%, ${this._alpha})`;
	}

	get hex()
	{
		return `#${this._red.toString(16)}${this._green.toString(16)}${this._blue.toString(16)}`;
	}

	get hue()
	{
		return this._hue;
	}

	get saturation()
	{
		return this._saturation;
	}

	get lightness()
	{
		return this._lightness;
	}

	get red()
	{
		return this._red;
	}

	get green()
	{
		return this._green;
	}

	get blue()
	{
		return this._blue;
	}

	get alpha()
	{
		return this._alpha;
	}

	constructor(string)
	{
		// get color value from string
		document.head.style.color = string;
		let color = getComputedStyle(document.head).color.match(/\d+/g);

		// store returned rgb value
		[this._red, this._green, this._blue] = color;
		this._alpha = (typeof color[3] !== 'undefined') ? color[3] : 1;

		// store the hsl value too
		this._rgb2hsl();
	}

	/* === hue changes === */

	rotate(angle)
	{
		this._hue += angle;
		this._hsl2rgb();

		return this;
	}

	complimentary()
	{
		this._hue += 180;
		this._hue %= 360;
		this._hsl2rgb();

		return this;
	}

	setHue(value)
	{
		this._hue = value;
		this._hue %= 360;
		this._hsl2rgb();

		return this;
	}

	/* === saturation changes === */

	saturate(amount)
	{
		this._saturation += amount;
		this._hsl2rgb();

		return this;
	}

	desaturate(amount)
	{
		this._saturation -= amount;
		this._hsl2rgb();

		return this;
	}

	grayscale()
	{
		this._saturation = 0;
		this._hsl2rgb();

		return this;
	}

	setSaturation(value)
	{
		this._saturation = value;
		this._hsl2rgb();

		return this;
	}

	/* === lightness changes === */

	lighten(amount)
	{
		this._lightness += amount;
		this._hsl2rgb();

		return this;
	}

	darken(amount)
	{
		this._lightness -= amount;
		this._hsl2rgb();

		return this;
	}

	invert()
	{
		this._lightness = 1 - this._lightness;
		this._hsl2rgb();

		return this;
	}

	setLightness(value)
	{
		this._lightness = value;
		this._hsl2rgb();

		return this;
	}

	/* === alpha changes === */

	transparentize(amount)
	{
		this._alpha -= amount;

		return this;
	}

	opacify(amount)
	{
		this._alpha += amount;

		return this;
	}

	setAlpha(value)
	{
		this._alpha = value;

		return this;
	}

	/* === color changes === */

	redShift(amount)
	{
		this._red += amount;
		this._rgb2hsl();

		return this;
	}

	setRed(value)
	{
		this._red = value;
		this._rgb2hsl();

		return this;
	}

	greenShift(amount)
	{
		this._green += amount;
		this._rgb2hsl();

		return this;
	}

	setGreen(value)
	{
		this._green = value;
		this._rgb2hsl();

		return this;
	}

	blueShift(amount)
	{
		this._blue += amount;
		this._rgb2hsl();

		return this;
	}

	setBlue(value)
	{
		this._blue = value;
		this._rgb2hsl();

		return this;
	}

	/* === helper functions === */

	_rgb2hsl()
	{
		let r = this._red / 255,
			g = this._green / 255,
			b = this._blue / 255,
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

		this._hue = h * 360;
		this._saturation = s;
		this._lightness = l;
	}

	_hsl2rgb()
	{
		let r, g, b,
			h = this._hue / 360,
			s = this._saturation,
			l = this._lightness;

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

		this._red = Math.round(r * 255);
		this._green = Math.round(g * 255);
		this._blue = Math.round(b * 255);
	}
}
