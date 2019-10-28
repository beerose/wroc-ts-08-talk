// #region imports

// "imports" from 06.ts

export type ConsList<T> = null | readonly [T, ConsList<T>];

namespace ConsList {
  export function cons<T>(h: T, t: ConsList<T>): ConsList<T> {
    return [h, t];
  }

  export function head<T>(xs: ConsList<T>): T {
    if (!xs) {
      throw new Error("can't take head of empty ConsList");
    }
    return xs[0];
  }

  export function tail<T>(xs: ConsList<T>): ConsList<T> {
    if (!xs) {
      throw new Error("can't take tail of empty ConsList");
    }
    return xs[1];
  }

  export function of<T>(...xs: [T, ...T[]]): ConsList<T> {
    let res: ConsList<T> = null;
    for (let i = xs.length - 1; i >= 0; --i) {
      res = cons(xs[i], res);
    }
    return res;
  }

  export function map<A, B>(xs: ConsList<A>, f: (a: A) => B): ConsList<B> {
    if (xs === null) {
      return null;
    }
    const [head, tail] = xs;
    return cons(f(head), map(tail, f));
  }

  function reduce<T, R = T>(xs: ConsList<T>, reducer: (acc: R, val: T) => R, initialValue: R): R {
    if (xs) {
      const [head, tail] = xs;
      return reduce(tail, reducer, reducer(initialValue, head));
    }
    return initialValue;
  }

  export function reverse<T>(xs: ConsList<T>): ConsList<T> {
    return reduce(xs, (a, v) => cons(v, a), null as ConsList<T>);
  }
}

// #endregion

// # use cases

/**
 * **first-in-first-out queue**
 */

import { some, none, Option } from "fp-ts/lib/Option";

type Queue<T> = {
  front: ConsList<T>;
  end: ConsList<T>;
};

const empty = <T>(): Queue<T> => ({ front: null, end: null });

const isEmpty = (queue: Queue<unknown>) => (queue.front || queue.end) === null;

const enqueue = <T>(x: T, { front, end }: Queue<T>) => ({
  front: ConsList.cons(x, front),
  end,
});

const dequeue = <T>(queue: Queue<T>): [Option<T>, Queue<T>] => {
  const { front, end } = queue;
  if (end) {
    const [value, newEnd] = end;
    return [some(value), { front, end: newEnd }];
  }

  if (front) {
    return dequeue({ front: null, end: ConsList.reverse(front) });
  }

  return [none, queue];
};

let q = empty<number>();

console.log((q = enqueue(300, enqueue(200, enqueue(100, q)))));

const [res1, q1] = dequeue(q);
console.log(res1);
console.log(q1);
console.log(dequeue(dequeue(dequeue(q1)[1])[1]));
