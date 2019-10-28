// #region imports
// "imports" from 06.ts

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

//#endregion

// Bonus: fp-ts type class instances

// quick reminder
type ConsList<T> = null | readonly [T, ConsList<T>];

//

import { Monad1 } from "fp-ts/lib/Monad";

declare module "fp-ts/lib/HKT" {
  interface URItoKind<A> {
    ConsList: ConsList<A>;
  }
}

// type class instance
const consList: Monad1<"ConsList"> = {
  URI: "ConsList",
  map,
  of,
  chain: (xs, f) => flatten(map(xs, f)),
  ap: (consListOfFunctions, consListOfValues) =>
    consList.chain(consListOfFunctions, f => map(consListOfValues, f)),
};

console.log(
  toArray(consList.ap(of(x => x ** 2, (x: number): string | number => String(x)), of(1, 2))),
);

const twice = <T>(x: T) => of(x, x);

console.log(toArray(consList.chain(of(1, 2), twice)));

function reduce<T, R = T>(xs: ConsList<T>, reducer: (acc: R, val: T) => R, initialValue: R): R {
  if (xs) {
    const [head, tail] = xs;
    return reduce(tail, reducer, reducer(initialValue, head));
  }
  return initialValue;
}

console.log(reduce(of(2, 3, 4), (a, v) => a + v, 0));

function toArray<T>(xs: ConsList<T>) {
  return reduce<T, T[]>(
    xs,
    (a, v) => {
      a.push(v);
      return a;
    },
    [],
  );
}

console.log(toArray(of(1, 2, 3, 4, 5)));

function concat<T>(xs: ConsList<T>, ys: ConsList<T>): ConsList<T> {
  return xs ? cons(head(xs), concat(tail(xs), ys)) : ys;
}

console.log(toArray(concat(of(1, 2), of(3, 4, 5))));

function flatten<T>(xs: ConsList<ConsList<T>>) {
  return reduce(xs, concat, null as ConsList<T>);
}

// prettier-ignore
console.log(
  toArray(
    flatten(
      flatten(
        of(
          of(
            of("this"),
            of("is"),
            of('pretty'),
            of('nested')
          ),
          of(
            of("huh?")
          )
        )
      )
    )
  )
);
