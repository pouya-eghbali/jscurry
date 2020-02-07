const { curry } = require("./index.js");

test("Test simple curry", () => {
  const add = (a, b) => a + b;
  const add2 = curry(add)(2);
  expect(add2(3)).toEqual(5);
});

test("Test unlimited arity curry", () => {
  const add = (a, b) => a + b;
  const addinf = (...args) => args.reduce(add, 0);
  const add2inf = curry(addinf)(2);
  expect(add2inf(1)(1)(1)()).toEqual(5);
});

test("Test native function curry", () => {
  const pow = curry(Math.pow);
  const powOf2 = pow(2);
  expect(powOf2(3)).toEqual(8);
});
