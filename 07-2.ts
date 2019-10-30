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

type Queue<T> = {
  front: ConsList<T>;
  back: ConsList<T>;
};

const empty = <T>(): Queue<T> => ({ front: null, back: null });

const isEmpty = (queue: Queue<unknown>) => (queue.front || queue.back) === null;

const enqueue = <T>(x: T, { front, back }: Queue<T>) => ({
  back: ConsList.cons(x, back),
  front,
});

const dequeue = <T>(queue: Queue<T>): [T | null, Queue<T>] => {
  const { front, back } = queue;
  if (front) {
    const [value, newFront] = front;
    return [value, { back, front: newFront }];
  }

  if (back) {
    return dequeue({ back: null, front: ConsList.reverse(back) });
  }

  return [null, queue];
};

let q = empty<number>();

console.log(JSON.stringify((q = enqueue(300, enqueue(200, enqueue(100, q))))));

const [res1, q1] = dequeue(q);
console.log(res1);
console.log(q1);

const q2 = enqueue(400, q1);
console.log(q2);
console.log(dequeue(q2));
console.log(dequeue(dequeue(dequeue(q2)[1])[1]));
