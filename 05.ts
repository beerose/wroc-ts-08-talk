// Cons List before TypeScript 3.7

// Type alias 'ConsList' circularly references itself.ts(2456)
// type ConsList<T> = null | readonly [T, ConsList<T>];

export type ConsList<T> = null | [T, ConsCell<T>];

interface ConsCell<T> {
  readonly [0]: T;
  readonly [1]: ConsList<T>;
}
