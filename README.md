# Synopsis

**ary** is a JavaScript function for restricting a function to a given number of arguments (i.e. capping its *arity*).

[![stability 5 - locked](http://b.repl.ca/v1/stability-5_--_locked-blue.png)
](http://nodejs.org/api/documentation.html#documentation_stability_index) [![license - Unlicense](http://b.repl.ca/v1/license-Unlicense-lightgrey.png)](http://unlicense.org/) [![Flattr this](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=pluma&url=https://github.com/pluma/ary)

[![browser support](https://ci.testling.com/pluma/ary.png)](https://ci.testling.com/pluma/ary)

[![Build Status](https://travis-ci.org/pluma/ary.png?branch=master)](https://travis-ci.org/pluma/ary) [![Coverage Status](https://coveralls.io/repos/pluma/ary/badge.png?branch=master)](https://coveralls.io/r/pluma/ary?branch=master) [![Dependencies](https://david-dm.org/pluma/ary.png?theme=shields.io)](https://david-dm.org/pluma/ary)

# Why?

It's trivial to implement, but in order to keep code DRY (and avoid silly mistakes) it makes sense to define this function only once per project. This library is the logical consequence of that.

# Install

## Node.js

### With NPM

```sh
npm install ary
```

### From source

```sh
git clone https://github.com/pluma/ary.git
cd ary
npm install
make
```

## Browser

### With component

```sh
component install pluma/ary
```

[Learn more about component](https://github.com/component/component).

### With bower

```sh
bower install ary
```

[Learn more about bower](https://github.com/twitter/bower).

### With a CommonJS module loader

Download the [latest minified CommonJS release](https://raw.github.com/pluma/ary/master/dist/ary.min.js) and add it to your project.

[Learn more about CommonJS modules](http://wiki.commonjs.org/wiki/Modules/1.1).

### With an AMD module loader

Download the [latest minified AMD release](https://raw.github.com/pluma/ary/master/dist/ary.amd.min.js) and add it to your project.

[Learn more about AMD modules](http://requirejs.org/docs/whyamd.html).

### As a standalone library

Download the [latest minified standalone release](https://raw.github.com/pluma/ary/master/dist/ary.globals.min.js) and add it to your project.

```html
<script src="/your/js/path/ary.globals.min.js"></script>
```

This makes the `ary` function available in the global namespace.

# Basic usage example

```javascript
var ary = require('ary');
var array = [1, 2, 3, 4];
var log = console.log.bind(console);

array.forEach(log); // passes in three arguments: item, index, array
/* Console output:
1, 0, [1, 2, 3, 4]
2, 1, [1, 2, 3, 4]
3, 2, [1, 2, 3, 4]
4, 3, [1, 2, 3, 4]
*/

array.forEach(ary(1, log)); // only logs the first argument: item
/* Console output:
1
2
3
4
*/
```

# Advanced usage example

```javascript
var ary = require('ary');

// Our example function: takes any number of arguments
// and returns them as a dash-separated string
function dashed() {
  return Array.prototype.slice.call(arguments).join('-');
}
dashed('a', 'b', 'c', 'd'); // 'a-b-c-d';

// We can create re-usable decorators
var nullary = ary(0);
var unary = ary(1);
var binary = ary(2);

var dashed0 = nullary(dashed);
dashed0('a', 'b', 'c', 'd'); // ''

var dashed1 = unary(dashed);
dashed1('a', 'b', 'c', 'd'); // 'a'

// Named arity functions for 0 to 3 are included out of the box:
var dashed2 = ary.binary(dashed);
dashed2('a', 'b', 'c', 'd'); // 'a-b'

// Or pass both arguments at once!
var dashed3 = ary(3, dashed);
dashed3('a', 'b', 'c', 'd'); // 'a-b-c'

// If a wrapped function is called with less arguments,
// they will be set to `undefined`:

dashed2('a'); // 'a-'
dashed3('a'); // 'a--'

// Although the original function has no length ...
dashed.length; // 0

// ... the wrapped functions always have the expected length!
dashed0.length; // 0
dashed1.length; // 1
dashed2.length; // 2
dashed3.length; // 3

// If the function is named, the wrapped function retains the name!
dashed.name; // 'dashed'
dashed0.name; // 'dashed'
dashed0.name === dashed.name; // true
dashed1.name === dashed.name; // true
dashed2.name === dashed.name; // true
dashed3.name === dashed.name; // true
```

# API

## ary(arity:Number, func:Function):Function

Wraps the given function in a new function of the given arity.

If the wrapped function is called with more than `arity` arguments, any additional arguments will be dropped.

If the wrapped function is called with less than `arity` arguments, any missing arguments will be set to `undefined`.

## ary(arity:Number):Function

Returns a function that will wrap a function in a new function of the given arity.

## ary.nullary(func:Function):Function

Shorthand for `ary(0, func)`.

## ary.unary(func:Function):Function

Shorthand for `ary(1, func)`.

## ary.binary(func:Function):Function

Shorthand for `ary(2, func)`.

## ary.ternary(func:Function):Function

Shorthand for `ary(3, func)`.

# Unlicense

This is free and unencumbered public domain software. For more information, see http://unlicense.org/ or the accompanying [UNLICENSE](https://github.com/pluma/ary/blob/master/UNLICENSE) file.
