# Linked List Operations In Javascript

This package provides a set of tools to work with a singly linked list.
Really it was just an exercise in implementing the linked list and comparing
its performance in different operations to an array.

## Usage

```javascript
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
} from 'linked-list';

var myList = new List('foo', 'bar', 'baz');

// Get the tail of the list
tail(myList); // Node{next: null, data: 'baz'}

// Append to the list
myList = append(myList, 'foz');
tail(myList); // Node{next: null, data: 'foz'}

// Prepend to the list
myList = prepend(myList, 'fob'); // Node{next: Node{data: 'foo'}, data: 'fob'}

// Iterate the list
forEach(myList, function (node, index, list) {
	// do stuff ...
});

// Remove an item
myList = remove(myList, 'bar');
// fob -> foo -> baz -> foz

// Get the node at an index
get(myList, 2) // Node{next: Node{data: 'foz'}, data: 'baz'}

// Reverse the list
myList = reverse(myList);
// foz -> baz -> foo -> fob

// Get the list length
length(myList); // 4

// Splice from the list
myList = splice(myList, 1, 1);
// foz -> foo -> fob
myList = splice(myList, 1, 0, 'bob');
// foz -> bob -> foo -> fob
```

## Performance vs Array

This repo was something I started after someone tweeted asking "When would you use a linked 
list over an array in javascript".  I had a few of the operations on a singly linked list alreay worked out, 
so I figured I would just build out the rest and compare their perf.

My findings were that there are three situations where a linked list has significantly higher performance 
than an array.

1. Mixed data types - with mixed type collections, creating a linked list is ~85% faster
2. Prepending - prepending to a linked list is ~840% faster on small lists (<100 nodes) and  on large lists ~1840% faster
3. Reversing a list - this was ~200% faster in my tests. But really when are you doing this operation?

Running the tests does some basic comparisons.  `$ npm test`
