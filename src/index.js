export function List (items) {
	if (arguments.length > 1) {
		return listFromArray(arguments);
	}
	if (Array.isArray(items)) {
		return listFromArray(items);
	}
	return Node(items);
}

function listFromArray (items) {
	var head = null;
	var i = items.length;
	while (i--) {
		var n = Node(items[i]);
		n.next = head;
		head = n;
	}
	return head;
}

export function length (list) {
	var length = 0;
	var head = list;
	while (head) {
		length++;
		head = head.next;
	}
	return length;
}

export function Node (data) {
	return {
		data: data,
		next: null
	};
}

export function tail (list) {
	while (list && list.next) {
		list = list.next;
	}
	return list;
}

export function append (list, item) {
	var _tail = tail(list);
	_tail && (_tail.next = Node(item));
	return list;
}

export function prepend (list, item) {
	var head = Node(item);
	head.next = list;
	return head;
}

export function forEach (list, fnc) {
	var i = 0;
	var head = list;
	while (head) {
		// Early return by returning false
		// from forEach callback
		if (fnc(head, i, list) === false) {
			return;
		}
		i++;
		head = head.next;
	}
	return list;
}

export function remove (list, val) {
	// Since this is a singly linked list,
	// we need to keep a reference to the last
	// seen node to link after removing
	var prev = null;
	var head = list;

	while (head) {
		if (head.data === val) {
			if (prev) {
				prev.next = head.next;
			} else {
				list = head.next;
			}
		}
		prev = head;
		head = head.next;
	}

	return list;
}

export function get (list, index) {
	var i = 0;
	while (list) {
		if (i === index) {
			return list;
		}
		list = list.next;
		i++;
	}
}

export function splice (list, start, remove = 0, ...insert) {
	var head = list;
	var end = start + remove;
	var i = 0;
	var prev;
	while (head) {
		if (i === end) {
			// Insert
			let item;
			while (item = insert.pop()) { // eslint-disable-line no-cond-assign
				head = prepend(head, item);
			}

			if (prev) {
				prev.next = head;
			} else {
				list = head;
			}
			break;
		}

		// Keep the last item in the
		// first segment of the list
		if (i < start) {
			prev = head;
		}

		// Advance
		i++;
		head = head.next;

		// Append on the end?
		if (!head && i === end) {
			let item;
			while (item = insert.shift()) { // eslint-disable-line no-cond-assign
				prev = append(prev, item);
			}
		}
	}
	return list;
}

export function reverse (list) {
	var tmp;
	var prev = null;
	while (list) {
		tmp = list.next;
		list.next = prev;
		prev = list;
		list = tmp;
	}
	return prev;
}

/*
export function map (list, fnc) {
	// @TODO
};
 *
export function sort (list, fnc) {
	// @TODO
};

export function merge (a, b) {
	// @TODO
};
*/
