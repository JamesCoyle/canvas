export default class List
{
	get next()
	{
		if (this.reverse)
			return this.current.previous;
		else
			return this.current.next;
	}

	get previous()
	{
		if (this.reverse)
			return this.current.next;
		else
			return this.current.previous;
	}

	constructor(circular = false)
	{
		this.length = 0;
		this.first = null;
		this.current = null;
		this.last = null;
		this.reverse = false;
	}

	// move current pointer forward
	forward(loop = 1)
	{
		while (loop >= 1)
		{
			this.current = this.next;
			loop--;
		}

		return this;
	}

	// move current pointer backward
	backward(loop = 1)
	{
		while (loop >= 1)
		{
			this.current = this.previous;
			loop--;
		}

		return this;
	}

	// move current pointer to index
	index(index)
	{
		// REVIEW: count from end if closer

		this.current = this.first;

		while (index >= 1)
		{
			this.current = this.next;
			loop--;
		}

		return this;
	}

	// add item to the end of the list
	add(item)
	{
		// check if first item in list
		if (this.last !== null)
		{

			this.last.next = new Item(item, this.last);
			this.last = this.last.next;
		}

		// add first item
		else
			this.first = this.current = this.last = new Item(item);

		// increment count
		this.length++;

		// set current
		this.current = this.last;

		return this;
	}

	// insert item before or after current item
	insert(item, before = false)
	{
		if (this.current === null)
			return this.add(item);

		// insert before current
		if (before)
		{
			let item = new Item(item, this.current, this.previous);
			this.previous.next = item;
			this.previous = item;
		}

		// insert after current
		else
		{
			let item = new Item(item, this.current, this.next);
			this.next.previous = item;
			this.next = item;
		}

		return this;
	}

	// remove current item
	removeCurrent(skipToNext)
	{
		// set new first item
		if (this.previous === null)
			this.first = this.next;
		// update previous
		else
			this.previous.next = this.next;

		// set new last item
		if (this.next === null)
			this.last = this.previous;
		// update next
		else
			this.next.previous = this.previous;

		// set next as current
		if (skipToNext)
			this.current = this.next;
		// set previous as current
		else
			this.current = this.previous || this.first;

		this.length--;

		return this;
	}

	// reverse direction of traversal
	reverse()
	{
		// swap first and last
		let first = this.last;
		this.last = this.first;
		this.first = first;

		// reverse order
		this.reverse = !this.reverse;

		return this;
	}

	forEach(callback)
	{
		if (this.length <= 0)
			return;

		this.current = this.first;

		while (true)
		{
			if (this.current == null)
				break;

			if (typeof this.current.value !== 'undefined')
				callback(this.current.value);

			this.forward();
		}

		return this;
	}
}

class Item
{
	constructor(value, previous = null, next = null)
	{
		this.value = value;
		this.previous = previous;
		this.next = next;
	}
}
