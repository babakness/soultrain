/** @module function/bind.ts */

import defineFunctionProperties from './defineFunctionProperties'

const bindSymbol = Symbol( 'bind' )
export function bind<A, Y extends Array<unknown>, Z>( fn: ( a: A, ...args: Y ) => Z, a: A ): ( ...args: Y ) => Z
export function bind<A, B, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, ...args: Y ) => Z, a: A, b: B ): ( ...args: Y ) => Z
export function bind<A, B, C, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, ...args: Y ) => Z, a: A, b: B, c: C ): ( ...args: Y ) => Z
export function bind<A, B, C, D, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, ...args: Y ) => Z, a: A, b: B, c: C, d: D ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, M, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, M, N, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V, w: W, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V, w: W ): ( ...args: Y ) => Z
export function bind<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y extends Array<unknown>, Z>( fn: ( a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V, w: W, x: X, ...args: Y ) => Z, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, r: R, s: S, t: T, u: U, v: V, w: W, x: X ): ( ...args: Y ) => Z
/**
 * Bind partially applies parameters to a function but does
 * not execute it even if all required parameters are passed.
 * One can repeatedly use bind, however, `curry` may be a better
 * choice for that case.
 * @example
 * const addThree = (a: number, b: number, c: number ) => a + b + c
 * const bound2 = bind( addThree, 1, 2 )
 * const result = bound2( 3 ) // 6
 */
export function bind( this: unknown, fn, ...args ) {
  // tslint:disable-next-line:variable-name
  return ( args.length >= fn.length
    ? this === bindSymbol
      ? fn( ...args )
      : defineFunctionProperties( () => fn( ...args ), { length: 0 } )
    : defineFunctionProperties( bind.bind( bindSymbol, fn, ...args ), {
      length: fn.length - args.length,
      // name: fn.name,
    } )
  )
}

export default bind
