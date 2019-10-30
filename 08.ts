// #region imports

// "imports" from 06.ts

export type ConsList<T> = null | readonly [T, ConsList<T>];

function cons<T>(h: T, t: ConsList<T>): ConsList<T> {
  return [h, t];
}

function head<T>(xs: ConsList<T>): T {
  if (!xs) {
    throw new Error("can't take head of empty ConsList");
  }
  return xs[0];
}

function tail<T>(xs: ConsList<T>): ConsList<T> {
  if (!xs) {
    throw new Error("can't take tail of empty ConsList");
  }
  return xs[1];
}

function of<T>(...xs: [T, ...T[]]): ConsList<T> {
  let res: ConsList<T> = null;
  for (let i = xs.length - 1; i >= 0; --i) {
    res = cons(xs[i], res);
  }
  return res;
}

function reduce<T, R = T>(
  xs: ConsList<T>,
  reducer: (acc: R, val: T) => R,
  initialValue: R,
): R {
  while (xs) {
    const [head, tail] = xs;
    initialValue = reducer(initialValue, head);
    xs = tail;
  }
  return initialValue;
}

function reverse<T>(xs: ConsList<T>): ConsList<T> {
  return reduce(
    xs,
    (acc, v) => cons(v, acc),
    null as ConsList<T>,
  );
}

function fromArray<T>(array: T[]): ConsList<T> {
  return array.length
    ? of(...(array as [T, ...T[]]))
    : null;
}

// #endregion

const BENCHMARK_TIME = 1000 /* ms */;

// #region benchmark utils

const { performance } = require("perf_hooks");

const benchmark = (f: () => void) => {
  const start = performance.now();

  let ops = 0;
  let timeElapsed: number;
  while (
    (timeElapsed = performance.now() - start) <
    BENCHMARK_TIME
  ) {
    f();
    ops++;
  }
  // prettier-ignore
  return `${f.toString().slice(6)} → ${ops} ops → time elapsed: ${Math.floor(timeElapsed)} ms`;
};

// #endregion

/**
 * **benchmarks**
 */

const REALISTIC_NUMBER_OF_THINGS_IN_PRODUCTION_APP = 10_000;

/**
 * setup
 */

const array = new Array(
  REALISTIC_NUMBER_OF_THINGS_IN_PRODUCTION_APP,
)
  .fill(0)
  .map(() => Math.random());

const list = fromArray(array);

/**
 * actual benchmarks
 */

console.log(
  "(Mutable) Array.prototype.unshift vs Array.prototype.push vs cons \n",
);

console.log(benchmark(() => array.unshift(50)));

console.log(benchmark(() => array.push(50)));

console.log(benchmark(() => cons(50, list)));

console.log("\n \n(Immutable) array spread vs cons \n");

console.log(benchmark(() => [50, ...array]));

console.log(benchmark(() => cons(50, list)));

console.log("\n\nArray.prototype.map vs map\n");

console.log(benchmark(() => array.map(x => x * 2)));

// non-recursive version of map from slide 6
function map<A, B>(
  xs: ConsList<A>,
  f: (a: A) => B,
): ConsList<B> {
  let res: ConsList<B> = null;
  while (xs) {
    const [head, tail] = xs;
    res = [f(head), res];
    xs = tail;
  }
  return reverse(res);
}

console.log(benchmark(() => map(list, x => x * 2)));
