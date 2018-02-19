import List from '../structure/list.js';

import Point from '../types/point.js';
import Vector from '../types/vector.js';

import Particle from './particle.js';

class Emitter
{
	constructor(drawable, rate, maximum, remaining = undefined)
	{
		this.drawable = drawable;
		this.rate = rate;
		this.maximum = maximum;
		this.remaining = remaining;
		this._partialParticle = 0;

		// set defaults
		this._angle = {
			angle: 0,
			variance: 0
		};
		this._angularVelocity = {
			angle: 0,
			variance: 0
		};
		this._angularAcceleration = {
			angle: 0,
			variance: 0
		};
		this._velocity = {
			force: 0,
			angle: 0,
			variance: 0
		};
		this._acceleration = 0;

		this.particles = new List();

		// default handlers
		this._particleUpdate = function () {};
		this._particleExpired = function () {};
		this._update = function () {};
		this._expired = function () {};
	}

	range(distance)
	{
		this._range = distance;

		return this;
	}

	ttl(time)
	{
		this._time = time;

		return this;
	}

	angle(angle, spread = 0)
	{
		this._angle = {
			angle: angle,
			variance: spread
		};
		return this;
	}

	velocity(force, angle, spread = 0)
	{
		this._velocity = {
			force: force,
			angle: angle,
			variance: spread
		};
		return this;
	}

	acceleration(force)
	{
		this._acceleration = force;
		return this;
	}

	angularVelocity(angularVelocity, spread = 0)
	{
		this._angularVelocity = {
			angle: angularVelocity,
			variance: spread
		};
		return this;
	}

	angularAcceleration(angularAcceleration, spread = 0)
	{
		this._angularAcceleration = {
			angle: acceleration,
			variance: spread
		};
		return this;
	}

	particleOnUpdate(callback)
	{
		this._particleUpdate = callback;

		return this;
	}

	particleOnExpired(callback)
	{
		this._particleExpired = callback;

		return this;
	}

	onUpdate(callback)
	{
		this._update = callback;

		return this;
	}

	onExpired(callback)
	{
		this._expired = callback;

		return this;
	}

	emit(position)
	{
		if (typeof position === 'undefined')
			return;

		// check if space for more particles
		if (this.particles.length >= this.maximum)
			return;

		// check if emitter has particles left to emit
		if (typeof this.remaining !== 'undefined' && this.remaining <= 0)
			// TODO: kill emitter
			return;

		// calculate initial settings
		let angle = this._randomizeAngle(this._velocity),
			rotation = this._randomizeAngle(this._angle),
			velocity = Vector.fromAngle(angle, this._velocity.force),
			acceleration = Vector.fromAngle(angle, this._acceleration),
			angularVelocity = this._randomizeAngle(this._angularVelocity),
			angularAcceleration = this._randomizeAngle(this._angularAcceleration);

		// create new particle
		let p = new Particle(this.drawable, Point.from(position), rotation, velocity, angularVelocity, acceleration, angularAcceleration);

		// store particle
		this.particles.add(p);
	}

	update(delta)
	{
		// emit new particles
		let toEmit = this.rate / 1000 * delta;
		this._partialParticle = toEmit % 1;

		while (toEmit > 1)
		{
			this.emit();
			toEmit--;
		}

		// update particles
		this.particles.forEach((particle) =>
		{
			// delete expired particle
			if (particle.expired)
			{
				this._particleExpired(particle);
				this.particles.removeCurrent();
				return;
			}

			// check if has expired this update
			this.checkForExpiry(particle);

			// update particle
			particle.update(delta);

			// external update of particle
			this._particleUpdate(particle);
		});

		// external update of emitter
		this._update();
	}

	draw(ctx)
	{
		this.particles.forEach((particle) =>
		{
			particle.draw(ctx);
		});
	}

	_randomizeAngle(value)
	{
		let offset = (Math.random() - 0.5) * value.variance;

		return value.angle + offset;
	}

	_randomizeVector(vector)
	{
		let offsetX = (Math.random() - 0.5) * vector.variance.x,
			offsetY = (Math.random() - 0.5) * vector.variance.x;

		return new Vector(vector.value.x + offsetX, vector.value.y + offsetY);
	}
}

export class PointEmitter extends Emitter
{
	constructor(point, drawable, rate, maximum, remaining = undefined)
	{
		super(drawable, rate, maximum, remaining);

		this.point = point;
	}

	checkForExpiry(particle)
	{
		// kill if out of range
		if (typeof this._range == 'number' && this.point.distanceFrom(particle.position) > this._range)
			particle.expired = true;

	}

	emit()
	{
		super.emit(this.point);
	}
}

export class LineEmitter extends Emitter
{
	constructor(line, drawable, rate, maximum, remaining = undefined)
	{
		super(drawable, rate, maximum, remaining);

		this.line = line;
	}

	checkForExpiry(particle)
	{
		// kill if out of range
		if (typeof this._range == 'number' && this.line.distanceFrom(particle.position) > this._range)
			particle.expired = true;
	}

	emit()
	{
		let pos = this.line.getPointAt(Math.random());

		super.emit(pos);
	}
}
