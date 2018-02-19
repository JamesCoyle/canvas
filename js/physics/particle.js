import Vector from '../types/vector.js';

export default class Particle
{
	constructor(drawable, position, angle, velocity = Vector.ZERO, angularVelocity = 0,
		acceleration = Vector.ZERO, angularAcceleration = 0)
	{
		this.drawable = drawable;
		this.position = position;
		this.rotation = angle;
		this.velocity = velocity;
		this.angularVelocity = angularVelocity;
		this.acceleration = acceleration;
		this.angularAcceleration = angularAcceleration;
	}

	update(delta)
	{
		// update postion
		this.position.add(this.velocity, delta / 1000);
		this.rotation += this.angularVelocity * delta / 1000;

		// update velocity
		this.velocity.add(this.acceleration, delta / 1000);
		this.angularVelocity += this.angularAcceleration * delta / 1000;
	}

	draw(ctx)
	{
		// update drawable
		this.drawable.position.moveTo(this.position);
		this.drawable.rotation = this.rotation;

		// draw
		this.drawable.draw(ctx);

		return this;
	}
}
