// functions operating on cons lists

import { ConsList } from "./04";

const cons = <T>(h: T, t: ConsList<T>): ConsList<T> => [
  h,
  t,
];

const head = <T>(xs: ConsList<T>): T => {
  if (!xs) {
    throw new Error("can't take head of empty ConsList");
  }
  return xs[0];
};

const tail = <T>(xs: ConsList<T>): ConsList<T> => {
  if (!xs) {
    throw new Error("can't take tail of empty ConsList");
  }
  return xs[1];
};

const of = <T>(...xs: T[]): ConsList<T> => {
  let res: ConsList<T> = null;
  for (let i = xs.length - 1; i >= 0; --i) {
    res = cons(xs[i], res);
  }
  return res;
};

console.log(of("hello"));

const oneTwoThree = of(1, 2, 3);
console.log(oneTwoThree);

const map = <A, B>(
  xs: ConsList<A>,
  f: (a: A) => B,
): ConsList<B> => {
  if (xs === null) {
    return null;
  }
  const [head, tail] = xs;
  return cons(f(head), map(tail, f));
};

console.log(map(oneTwoThree, x => x * 2));
