export default class Property
{
	constructor(value)
	{
		this.value = value;
	}

	valueOf()
	{
		return this.value;
	}

	toString()
	{
		return this.value.toString();
	}
}
