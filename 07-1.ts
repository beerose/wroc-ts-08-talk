// #region imports

// "imports" from 06.ts

type ConsList<T> = null | readonly [T, ConsList<T>];

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
// #endregion

// #region demo fun

type Location = { pathname: string; search: string };

const history = {
  listen(f: (_: Location) => void) {
    const pathnames = ["/login", "/settings", "/home", "/docs", "/docs", "/admin"];
    const interval = setInterval(() => {
      const pathname = pathnames.shift();
      if (pathname) {
        f({
          pathname,
          search: `sth?=${Math.floor((Math.random() * 10) ** 3)}`,
        });
      } else {
        clearInterval(interval);
      }
    }, 20);
  },
};

// #endregion

// # use cases

/**
 * **stack / last-in-first-out queue**
 */

const push = cons;
const pop = tail;
const peek = head;

let stack: ConsList<Location> = of({ pathname: "/", search: "" });

// our history is write-only, but we can listen for changes
history.listen(location => {
  if (peek(stack).pathname !== location.pathname) {
    stack = push(location, stack);
  }
});

setTimeout(() => {
  console.log(stack);
}, 25);

setTimeout(() => {
  console.log(stack);

  console.log(pop(stack));
}, 200);
