/* global describe, it */
var assert = require('assert');
var ll = require('../');
var List = ll.List;
var tail = ll.tail;
var append = ll.append;
var prepend = ll.prepend;
var forEach = ll.forEach;
var remove = ll.remove;
var get = ll.get;
var reverse = ll.reverse;
var length = ll.length;

describe('LinkedList', function () {
	it('should create a new linked list', function () {
		// From nothing
		assert.equal(List(), null);

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
});
