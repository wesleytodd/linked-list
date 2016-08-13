/* global describe, it, beforeEach */
// var assert = require('assert');

import {
	List,
	append,
	prepend,
	reverse
} from '../';

function timeIt (fnc) {
	var s = process.hrtime();
	fnc();
	return process.hrtime(s);
}

describe('LinkedList - Performance', function () {
	var itemsSmall, itemsLarge, itemsMixed;
	beforeEach(function () {
		itemsSmall = [];
		itemsLarge = [];
		itemsMixed = [];
		for (let i = 0; i < 100000; i++) {
			if (i < 100) {
				itemsSmall.push(i);

				// pick a random type
				var item;
				switch (i % 5) {
					case 0:
						item = i;
						break;
					case 1:
						item = 'ABCDEFGHIJAKMLOPQRSTUVWXYZ'[i % 26];
						break;
					case 2:
						item = {foo: i};
						break;
					case 3:
						item = [i];
						break;
					case 4:
						item = undefined;
						break;
				}
				itemsMixed.push(item);
			}
			itemsLarge.push(i);
		}
	});

	it('creating a small linked list', function () {
		var times = 1000000;
		var t1 = timeIt(function () {
			for (let i = 0; i < times; i++) {
				List(itemsSmall);
			}
		});
		var t2 = timeIt(function () {
			for (let i = 0; i < times; i++) {
				var a = [];
				for (let k = 0; k < itemsSmall.length; k++) {
					a.push(itemsSmall[k]);
				}
			}
		});

		var avg1 = t1[1] / times;
		var avg2 = t2[1] / times;
		var faster = (avg2 / avg1) * 100;

		console.log('Array creating is ' + Math.round(faster) + '% faster');
	});

	it('creating a large linked list', function () {
		var times = 1000;
		var t1 = timeIt(function () {
			for (let i = 0; i < times; i++) {
				List(itemsLarge);
			}
		});
		var t2 = timeIt(function () {
			for (let i = 0; i < times; i++) {
				var a = [];
				for (let k = 0; k < itemsLarge.length; k++) {
					a.push(itemsLarge[k]);
				}
			}
		});

		var avg1 = t1[1] / times;
		var avg2 = t2[1] / times;
		var faster = (avg2 / avg1) * 100;

		console.log('Array creating is ' + Math.round(faster) + '% faster');
	});

	it('creating a mixed type linked list', function () {
		var times = 10000;
		var t1 = timeIt(function () {
			for (let i = 0; i < times; i++) {
				List(itemsMixed);
			}
		});
		var t2 = timeIt(function () {
			for (let i = 0; i < times; i++) {
				var a = [];
				for (let k = 0; k < itemsMixed.length; k++) {
					a.push(itemsMixed[k]);
				}
			}
		});

		var avg1 = t1[1] / times;
		var avg2 = t2[1] / times;
		var faster = (avg1 > avg2 ? avg2 / avg1 : avg1 / avg2) * 100;

		console.log('Linked List creating is ' + Math.round(faster) + '% faster');
	});

	it('appending to the list', function () {
		var times = 10000;
		var t1 = timeIt(function () {
			for (let i = 0; i < times; i++) {
				var l = List(-1);
				for (let k = 0; k < itemsSmall.length; k++) {
					append(l, itemsSmall[k]);
				}
			}
		});
		var t2 = timeIt(function () {
			for (let i = 0; i < times; i++) {
				var l = [-1];
				for (let k = 0; k < itemsSmall.length; k++) {
					l.push(itemsSmall[k]);
				}
			}
		});

		var avg1 = t1[1] / times;
		var avg2 = t2[1] / times;

		console.log('Array appending is ' + Math.round((avg1 / avg2) * 100) + '% faster');
	});

	it('prepending to the list', function () {
		var times = 10000;
		var t1 = timeIt(function () {
			for (let i = 0; i < times; i++) {
				var l = List(-1);
				for (let k = 0; k < itemsSmall.length; k++) {
					prepend(l, itemsSmall[k]);
				}
			}
		});
		var t2 = timeIt(function () {
			for (let i = 0; i < times; i++) {
				var l = [-1];
				for (let k = 0; k < itemsSmall.length; k++) {
					l.unshift(itemsSmall[k]);
				}
			}
		});

		var avg1 = t1[1] / times;
		var avg2 = t2[1] / times;

		console.log('Linked List prepending is ' + Math.round((avg2 / avg1) * 100) + '% faster');
	});

	it('reversing the list', function () {
		var times = 10000;
		var l = List(itemsSmall);
		var t1 = timeIt(function () {
			for (let i = 0; i < times; i++) {
				reverse(l);
			}
		});
		var a = itemsSmall.splice();
		var t2 = timeIt(function () {
			for (let i = 0; i < times; i++) {
				a.reverse();
			}
		});

		var avg1 = t1[1] / times;
		var avg2 = t2[1] / times;

		console.log('Linked List reversing is ' + Math.round((avg2 / avg1) * 100) + '% faster');
	});
});
