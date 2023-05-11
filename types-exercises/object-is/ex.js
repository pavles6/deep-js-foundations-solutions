if (!Object.is) {
  Object.is = function (a, b) {
    if (isNan(a) && isNan(b)) {
      return true;
    }

    if (isNegZero(a) && isNegZero(b)) {
      return true;
    }

    if (isNegZero(a) || isNegZero(b)) {
      return false;
    }

    function isNegZero(x) {
      return a === 0 && 1 / x === -Infinity;
    }

    function isNan(x) {
      return typeof x === "number" && x.toString() === "NaN";
    }

    return a === b;
  };
}

// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is("foo", "foo") === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, "42") === false);
console.log(Object.is("42", 42) === false);
console.log(Object.is("foo", "bar") === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
