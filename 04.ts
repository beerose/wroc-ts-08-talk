// # Meet Cons List (TypeScript 3.7)

export type ConsList<T> = null | readonly [T, ConsList<T>];
