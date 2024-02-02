declare const __BRAND__: unique symbol;

export type Brand<B> = Readonly<{ [__BRAND__]: B }>;

export type Branded<B, T> = T & Brand<B>;

export function brand<B, T>(b: B, t: T): Branded<B, T> {
  return t as Branded<B, T>;
}
