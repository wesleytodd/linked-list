const _head = Symbol('head');
const _tail = Symbol('tail');

var LinkedList = module.exports = function () {
	this[_head] = null;
	this[_tail] = null;
	this.length = 0;
};

LinkedList.node = function (data) {
	return {
		data: data,
		next: null
	};
};

LinkedList.head = function (list) {
	return list[_head] && list[_head].data || null;
};

LinkedList.tail = function (list) {
	return list[_tail] && list[_tail].data || null;
};

LinkedList.prototype.append = function (data) {
	var node = LinkedList.node(data);
	if (!this[_head]) {
		this[_head] = node;
	}
	if (!this[_tail]) {
		this[_tail] = node;
	}
	this[_tail].next = node;
	this[_tail] = node;
	this.length++;
};

LinkedList.prototype.prepend = function (data) {
	var node = LinkedList.node(data);
	node.next = this[_head];
	this[_head] = node;
	if (!this[_tail]) {
		this[_tail] = node;
	}
	this.length++;
};

LinkedList.prototype.remove = function (val) {
	// Since this is a singly linked list,
	// we need to keep a reference to the last
	// seen node to link after removing
	var last = null;

	this.forEach(function (item) {
		// Found our item
		if (item.data === val) {
			// Item is head, just unlink head
			if (item === this[_head]) {
				this[_head] = item.next;
			}

			// Item is tail, unlink tail
			if (item === this[_tail]) {
				this[_tail] = last;
			}

			// If we have a last item, swap its next pointer
			if (last) {
				last.next = item.next;
			}

			// decrement length
			this.length--;

			// Stop looking
			return false;
		}

		last = item;
	});
};

LinkedList.prototype.forEach = function (fnc) {
	var head;
	while (head = (head ? head.next : this[_head])) { // eslint-disable-line no-cond-assign
		// Early return by returning false
		// from forEach callback
		if (fnc.call(this, head) === false) {
			return;
		}
	}
};

LinkedList.prototype.get = function (val) {
	var match;
	this.forEach(function (item) {
		if (item.data !== val) {
			return;
		}
		match = item;
		return false;
	});
	return match;
};

LinkedList.prototype.reverse = function () {
	var extra;
	var prev = null;
	while (this[_head]) {
		extra = this[_head].next;
		this[_head].next = prev;
		prev = this[_head];
		this[_head] = extra;
	}
	this[_head] = prev;
};

LinkedList.prototype.sort = function () {
	// @TODO
};

LinkedList.merge = function (a, b) {
	// @TODO
};
