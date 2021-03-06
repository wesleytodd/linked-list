/* global describe, it */
var assert = require('assert');

import {
	List,
	tail,
	append,
	prepend,
	forEach,
	remove,
	get,
	reverse,
	length,
	splice
} from '../';

describe('LinkedList', function () {
	it('should create a new linked list', function () {
		// From nothing
		assert.equal(List().data, undefined);

		// From the head balue
		var list = List('foo');
		assert.equal(list.data, 'foo');
		assert.equal(length(list), 1);

		// From multiple arguments
		var list2 = List('foo', 'bar');
		assert.equal(list2.data, 'foo');
		assert.equal(list2.next.data, 'bar');
		assert.equal(length(list2), 2);

		// From an array
		var list3 = List(['foo', 'bar']);
		assert.equal(list3.data, 'foo');
		assert.equal(list3.next.data, 'bar');
		assert.equal(length(list3), 2);
	});

	it('should append an item to the linked list', function () {
		var ll = List('foo');

		ll = append(ll, 'bar');
		assert.equal(length(ll), 2);
		assert.equal(ll.data, 'foo');
		assert.equal(tail(ll).data, 'bar');

		ll = append(ll, 'baz');
		assert.equal(length(ll), 3);
		assert.equal(ll.data, 'foo');
		assert.equal(tail(ll).data, 'baz');
	});

	it('should prepend an item to the linked list', function () {
		var ll = List('foo');

		ll = prepend(ll, 'bar');
		assert.equal(length(ll), 2);
		assert.equal(ll.data, 'bar');
		assert.equal(tail(ll).data, 'foo');

		ll = prepend(ll, 'baz');
		assert.equal(length(ll), 3);
		assert.equal(ll.data, 'baz');
		assert.equal(tail(ll).data, 'foo');
	});

	it('should iterate each items in the list', function () {
		var ll = List('foo', 'bar', 'baz');
		forEach(ll, function (node, i) {
			if (i === 0) {
				assert.equal(node.data, 'foo');
			}
			if (i === 1) {
				assert.equal(node.data, 'bar');
			}
			if (i === 2) {
				assert.equal(node.data, 'baz');
			}
		});
	});

	it('should remove an item from the linked list', function () {
		var ll = List('foo', 'bar', 'baz');

		ll = remove(ll, 'foo');
		assert.equal(length(ll), 2);
		assert.equal(ll.data, 'bar');
		assert.equal(tail(ll).data, 'baz');

		ll = remove(ll, 'bar');
		assert.equal(length(ll), 1);
		assert.equal(ll.data, 'baz');
		assert.equal(tail(ll).data, 'baz');

		ll = remove(ll, 'baz');
		assert.equal(length(ll), 0);
		assert.equal(ll, null);
		assert.equal(tail(ll), null);
	});

	it('should get a node at a given index', function () {
		var ll = List('foo', 'bar', 'baz');
		assert.equal(get(ll, 0).data, 'foo');
		assert.equal(get(ll, 1).data, 'bar');
		assert.equal(get(ll, 2).data, 'baz');
	});

	it('should get reverse a list', function () {
		var ll = List('foo', 'bar', 'baz');
		ll = reverse(ll);
		assert.equal(get(ll, 0).data, 'baz');
		assert.equal(get(ll, 1).data, 'bar');
		assert.equal(get(ll, 2).data, 'foo');
	});

	it('should splice in items', function () {
		var ll = List('foo', 'bar', 'baz');
		ll = splice(ll, 0, 0, 'foz');
		assert.equal(get(ll, 0).data, 'foz');
		assert.equal(get(ll, 1).data, 'foo');
		assert.equal(get(ll, 2).data, 'bar');
		assert.equal(get(ll, 3).data, 'baz');

		ll = splice(ll, 0, 1, 'boz');
		assert.equal(get(ll, 0).data, 'boz');
		assert.equal(get(ll, 1).data, 'foo');
		assert.equal(get(ll, 2).data, 'bar');
		assert.equal(get(ll, 3).data, 'baz');

		ll = splice(ll, 1, 0, 'far');
		assert.equal(get(ll, 0).data, 'boz');
		assert.equal(get(ll, 1).data, 'far');
		assert.equal(get(ll, 2).data, 'foo');
		assert.equal(get(ll, 3).data, 'bar');
		assert.equal(get(ll, 4).data, 'baz');

		ll = splice(ll, 1, 1, 'faz');
		assert.equal(get(ll, 0).data, 'boz');
		assert.equal(get(ll, 1).data, 'faz');
		assert.equal(get(ll, 2).data, 'foo');
		assert.equal(get(ll, 3).data, 'bar');
		assert.equal(get(ll, 4).data, 'baz');

		ll = splice(ll, 1, 3);
		assert.equal(get(ll, 0).data, 'boz');
		assert.equal(get(ll, 1).data, 'baz');

		ll = splice(ll, 2, 0, 'foo', 'bar');
		assert.equal(get(ll, 0).data, 'boz');
		assert.equal(get(ll, 1).data, 'baz');
		assert.equal(get(ll, 2).data, 'foo');
		assert.equal(get(ll, 3).data, 'bar');
	});
});
