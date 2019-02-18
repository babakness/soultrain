/** @module function/bindStrict.ts */

import defineFunctionProperties from './defineFunctionProperties'

const bindSymbol = Symbol( 'bind' )
export function bindStrict<A, Y extends Array<unknown>, Z>( fn: ( a: A, ...args: Y ) => Z, a: A ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, ...args: Y ) => Z, a: A, b: B ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, ...args: Y ) => Z, a: A, b: B, c: C ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, ...args: Y ) => Z, a: A, b: B, c: C, d: D ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, M, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, M, N, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V, w: W, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V, w: W ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
export function bindStrict<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V, w: W, x: X, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V, w: W, x: X ): ( ...args: Y extends ( Y['length'] extends 0 ? never : Y ) ? Y : void[] ) => Z
/**
 * bindStrict works like bind however it is typed so that a
 * function bound to all of its parameters can only be invoked
 * by passing an `undefined` value to it.
 * @example
 * const addThree = (a: number, b: number, c: number ) => a + b + c
 * const bound2 = bindStrict( addThree, 1, 2 )
 * const result = bound2( 3 ) // 6
 * const bound3 = bindStrict( addThree, 1, 2, 3 )
 * bound3() // works, 6
 * bound3( 4 ) // will not typecheck
 */
export function bindStrict( this: unknown, fn, ...args ) {
  // tslint:disable-next-line:variable-name
  return ( args.length >= fn.length
    ? this === bindSymbol
      ? fn( ...args )
      : defineFunctionProperties( () => fn( ...args ), { length: 0 } )
    : defineFunctionProperties( bindStrict.bind( bindSymbol, fn, ...args ), {
      length: fn.length - args.length,
      // name: fn.name,
    } )
  )
}

export default bindStrict
