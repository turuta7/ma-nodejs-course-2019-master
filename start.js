const utils = require ('utils');

//De-structuring
const { averageBy } = require('./node_modules/utils/math');
const { bifurcate } = require('./node_modules/utils/array');

//test_1
console.log(utils.string.compactWhitespace('Lorem \n Ipsum'));
console.log(utils.type.isBoolean(false));
console.log(utils.array.compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]));

console.log(utils.formatDuration(1001));

//test_2
console.log(averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'));
console.log(bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]));




