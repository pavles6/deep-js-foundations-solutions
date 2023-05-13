function findAll(target, values) {
  function isAlphanumericString(value) {
    return typeof value == "string" && value.trim() != "";
  }

  return values.reduce(function (acc, value) {
    if (Object.is(target, value)) {
      acc.push(value);
    } else if (target == null && value == null) {
      acc.push(value);
    } else if (typeof target == "boolean") {
      if (target === value) {
        acc.push(value);
      }
    } else if (
      !Object.is(target, -0) &&
      !Object.is(value, -0) &&
      (isAlphanumericString(target) || isAlphanumericString(value)) &&
      (typeof value == "number" || typeof target == "number")
    ) {
      if (target == value) {
        acc.push(value);
      }
    }

    return acc;
  }, []);
}
const myObj = { a: 2 };

const values = [
  null,
  undefined,
  -0,
  0,
  13,
  42,
  NaN,
  -Infinity,
  Infinity,
  "",
  "0",
  "42",
  "42hello",
  "true",
  "NaN",
  true,
  false,
  myObj,
];

// console.log(setsMatch(findAll(null, values), [null, undefined]) === true);
// console.log(setsMatch(findAll(undefined, values), [null, undefined]) === true);
// console.log(setsMatch(findAll(0, values), [0, "0"]) === true);
// console.log(setsMatch(findAll(-0, values), [-0]) === true);
// console.log(setsMatch(findAll(13, values), [13]) === true);
// console.log(setsMatch(findAll(42, values), [42, "42"]) === true);
// console.log(setsMatch(findAll(NaN, values), [NaN]) === true);
console.log(setsMatch(findAll(-Infinity, values), [-Infinity]) === true);
console.log(setsMatch(findAll(Infinity, values), [Infinity]) === true);
console.log(setsMatch(findAll("", values), [""]) === true);
console.log(setsMatch(findAll("0", values), [0, "0"]) === true);
console.log(setsMatch(findAll("42", values), [42, "42"]) === true);
console.log(setsMatch(findAll("42hello", values), ["42hello"]) === true);
console.log(setsMatch(findAll("true", values), ["true"]) === true);
console.log(setsMatch(findAll(true, values), [true]) === true);
console.log(setsMatch(findAll(false, values), [false]) === true);
console.log(setsMatch(findAll(myObj, values), [myObj]) === true);

console.log(setsMatch(findAll(null, values), [null, 0]) === false);
console.log(setsMatch(findAll(undefined, values), [NaN, 0]) === false);
console.log(setsMatch(findAll(0, values), [0, -0]) === false);
console.log(setsMatch(findAll(42, values), [42, "42hello"]) === false);
console.log(setsMatch(findAll(25, values), [25]) === false);
console.log(
  setsMatch(findAll(Infinity, values), [Infinity, -Infinity]) === false
);
console.log(setsMatch(findAll("", values), ["", 0]) === false);
console.log(setsMatch(findAll("false", values), [false]) === false);
console.log(setsMatch(findAll(true, values), [true, "true"]) === false);
console.log(setsMatch(findAll(true, values), [true, 1]) === false);
console.log(setsMatch(findAll(false, values), [false, 0]) === false);

// ***************************

function setsMatch(arr1, arr2) {
  if (
    Array.isArray(arr1) &&
    Array.isArray(arr2) &&
    arr1.length == arr2.length
  ) {
    for (let v of arr1) {
      if (!arr2.includes(v)) return false;
    }
    return true;
  }
  return false;
}
