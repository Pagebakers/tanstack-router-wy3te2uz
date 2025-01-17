const path = require('path-browserify');

// this is a hack because enhanced resolve / piral reads this and it doesnt exist
// in the polyfill.
path.win32 = path.posix;

module.exports = path;
