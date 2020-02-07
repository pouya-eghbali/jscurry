# JS Curry

JavaScript auto-curry. Works with native functions, regular ones,
...rest and parameters with default values. It does not depend on function.length.

## Install

```
npm install jscurry
```

## Usage

```JavaScript
const { curry } = require("jscurry");
const add = curry((a, b) => a + b);
const add2 = add(2);
console.log(add2(3)); // logs 5
```

## How to know if function is curried?

```JavaScript
const { Curry } = require("jscurry")
console.log(fn instanceof Curry)
```

## Advanced usage

```JavaScript
const { Curry } = require("jscurry")
const add2 = new Curry(
  (a, b) => a + b, // function
  2, // arity, pass null to autocompute
  [2] // list of args to start with
)
console.log(add2(3)) // logs 5
```
