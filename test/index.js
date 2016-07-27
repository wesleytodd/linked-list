/* global describe, it */
var assert = require('assert');
var LinkedList = require('../');

describe('LinkedList', function () {
	it('should create a linked list instance', function () {
		var ll = new LinkedList();
		assert.equal(ll.length, 0);
		assert.equal(LinkedList.head(ll), null);
		assert.equal(LinkedList.tail(ll), null);
	});

	it('should append an item to the linked list', function () {
		var ll = new LinkedList();
		ll.append('foo');
		assert.equal(ll.length, 1);
		assert.equal(LinkedList.head(ll), 'foo');
		assert.equal(LinkedList.tail(ll), 'foo');
		ll.append('bar');
		assert.equal(ll.length, 2);
		assert.equal(LinkedList.head(ll), 'foo');
		assert.equal(LinkedList.tail(ll), 'bar');
		ll.append('baz');
		assert.equal(ll.length, 3);
		assert.equal(LinkedList.head(ll), 'foo');
		assert.equal(LinkedList.tail(ll), 'baz');
	});

	it('should prepend an item to the linked list', function () {
		var ll = new LinkedList();
		ll.prepend('foo');
		assert.equal(ll.length, 1);
		assert.equal(LinkedList.head(ll), 'foo');
		assert.equal(LinkedList.tail(ll), 'foo');
		ll.prepend('bar');
		assert.equal(ll.length, 2);
		assert.equal(LinkedList.head(ll), 'bar');
		assert.equal(LinkedList.tail(ll), 'foo');
		ll.prepend('baz');
		assert.equal(ll.length, 3);
		assert.equal(LinkedList.head(ll), 'baz');
		assert.equal(LinkedList.tail(ll), 'foo');
	});

	it('should remove an item from the linked list', function () {
		var ll = new LinkedList();
		ll.append('foo');
		ll.append('bar');
		ll.append('baz');

		ll.remove('foo');
		assert.equal(ll.length, 2);
		assert.equal(LinkedList.head(ll), 'bar');
		assert.equal(LinkedList.tail(ll), 'baz');

		ll.remove('bar');
		assert.equal(ll.length, 1);
		assert.equal(LinkedList.head(ll), 'baz');
		assert.equal(LinkedList.tail(ll), 'baz');

		ll.remove('baz');
		assert.equal(ll.length, 0);
		assert.equal(LinkedList.head(ll), null);
		assert.equal(LinkedList.tail(ll), null);
	});
});
