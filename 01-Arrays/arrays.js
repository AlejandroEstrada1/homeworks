// push
let a = [1, 2];
a.push(3);
console.log("push:", a);

// pop
a.pop();
console.log("pop:", a);

// shift
a.shift();
console.log("shift:", a);

// unshift
a.unshift(0);
console.log("unshift:", a);

// concat
let b = a.concat([4, 5]);
console.log("concat:", b);

// slice
console.log("slice:", b.slice(1, 3));

// splice
b.splice(1, 1, 99);
console.log("splice:", b);

// map
console.log("map:", b.map(x => x * 2));

// filter
console.log("filter:", b.filter(x => x > 2));

// find
console.log("find:", b.find(x => x === 99));

// findIndex
console.log("findIndex:", b.findIndex(x => x === 99));

// includes
console.log("includes:", b.includes(99));

// indexOf
console.log("indexOf:", b.indexOf(99));

// lastIndexOf
console.log("lastIndexOf:", b.lastIndexOf(99));

// some
console.log("some:", b.some(x => x > 50));

// every
console.log("every:", b.every(x => x > 0));

// reduce
console.log("reduce:", b.reduce((s, x) => s + x, 0));

// sort
console.log("sort:", b.sort((a, b) => a - b));

// reverse
console.log("reverse:", b.reverse());

// join
console.log("join:", b.join("-"));

// flat
console.log("flat:", [1, [2, 3]].flat());

// flatMap
console.log("flatMap:", [1, 2].flatMap(x => [x, x * 2]));

// fill
console.log("fill:", new Array(3).fill(7));

// copyWithin
let c = [1, 2, 3, 4];
c.copyWithin(0, 2);
console.log("copyWithin:", c);

// forEach
[1, 2].forEach(x => console.log("forEach:", x));

// entries
console.log("entries:", [...["a", "b"].entries()]);

// keys
console.log("keys:", [...["a", "b"].keys()]);

// values
console.log("values:", [...["a", "b"].values()]);

// toString
console.log("toString:", [1, 2, 3].toString());

// toLocaleString
console.log("toLocaleString:", [1000, 2000].toLocaleString());