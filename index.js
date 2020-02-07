const acorn = require("acorn");

const tryOr = (fn, or) => {
  try {
    return fn();
  } catch {
    return or;
  }
};

const getParameters = fn =>
  acorn.parse(fn.toString()).body[0].expression.params;

const getArity = fn => {
  const params = tryOr(() => getParameters(fn), []);
  const last = params.pop();
  if (last && last.type == "RestElement") return Infinity;
  return Math.max(fn.length, params.length + last ? 1 : 0);
};

class ExtensibleFunction extends Function {
  constructor(fn) {
    return Object.setPrototypeOf(fn, new.target.prototype);
  }
}

class Curry extends ExtensibleFunction {
  constructor(fn, arity, args = []) {
    const curried = (...args) => {
      if (!args.length) return this.valueOf();
      const newArgs = [...this.args, ...args];
      const newCurry = new Curry(fn, this.arity, newArgs);
      return newArgs.length >= this.arity ? newCurry() : newCurry;
    };
    super(curried);
    this.fn = fn;
    this.args = args;
    this.arity = arity || getArity(fn);
  }
  valueOf() {
    return this.fn(...this.args);
  }
}

const curry = fn => new Curry(fn);

module.exports = { curry, Curry };
