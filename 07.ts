// Bonus: fp-ts type class instances

import { Applicative1 } from "fp-ts/lib/Applicative";

declare module "fp-ts/lib/HKT" {
  interface URItoKind<A> {
    ConsList: ConsList<A>;
  }
}

// static-land instance
const consList: Applicative1<"ConsList"> = {
  URI: "ConsList",
  map,
  // of,
  // ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
  ap: (fab, fa) => {},
};

const reduce = <T, R>(
  xs: ConsList<T>,
  reducer: (acc: R, val: T) => R,
  initialValue: R
): R => {
  if (xs) {
    const [head, tail] = xs;
    return reduce(tail, reducer, reducer(initialValue, head));
  }
  return initialValue;
};

console.log(reduce(of(1, 2, 3, 4, 5), (a, v) => a + v, 1));

// const concat = <T>(xs: ConsList<T>, ys: ConsList<T>) =>
// const flatten = <T>(xs: ConsList<ConsList<T>>) =>
// )

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// "imports"

// 04.ts

type ConsList<T> = null | readonly [T, ConsList<T>];

// 06.ts

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

function map<A, B>(xs: ConsList<A>, f: (a: A) => B): ConsList<B> {
  if (xs === null) {
    return null;
  }
  const [head, tail] = xs;
  return cons(f(head), map(tail, f));
}
