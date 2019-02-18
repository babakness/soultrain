/** @module placeholder.ts */

// import { HKT } from 'fp-ts/lib/HKT'
import { defineFunctionProperties } from './function'
import { untypedCurry } from './function/untypedCurry'
/**
 * Todo
 */
export class Placeholder {}
/**
 * Todo
 */
export const _ = new Placeholder()
/**
 * Todo
 */
export const isPlaceholder =
  // tslint:disable-next-line:no-shadowed-variable
  ( placeholder ): placeholder is Placeholder => placeholder instanceof Placeholder
/**
 * Todo
 */
export const pappSlots = ( ...placeholders ) => <A>( fn: ( ...a ) => A ) => ( ...fillers ): A => fn( ...placeholders.map(
  ( item ) => isPlaceholder( item ) ? fillers.shift() : item,
) )

// tslint:disable-next-line:variable-name
const _placeholders = ( fn, ...argsAndSlots ) => ( ...fillers ) => fn( ...argsAndSlots.map( ( item ) => isPlaceholder( item ) ? fillers.shift() : item ) )
// export function slots <A,B>(fn: (...a:B[]) => A, ...argsAndSlots: (B|Slot)[]  ) : ( ...fills:B[] ) => A
// export function slots <A,B>(fn: (...a:B[]) => A) : (...argsAndSlots: (B|Slot)[] ) => ( ...fills:B[] ) => A

export function placeholder <A, B, Z>( fn: ( a: A, b: B ) => Z, a: Placeholder, b: B ): ( p: A ) => Z
export function placeholder <A, B, Z>( fn: ( a: A, b: B ) => Z, a: A, b: Placeholder ): ( p: B ) => Z
export function placeholder <A, B, C, Z>( fn: ( a: A, b: B, c: C ) => Z, a: Placeholder, b: B, c: C ): ( p: A ) => Z
export function placeholder <A, B, C, Z>( fn: ( a: A, b: B, c: C ) => Z, a: A, b: Placeholder, c: C ): ( p: B ) => Z
export function placeholder <A, B, C , Z>( fn: ( a: A, b: B, c: C ) => Z, a: A, b: B, c: Placeholder ): ( p: C ) => Z
export function placeholder <A, B, C, D, Z>( fn: ( a: A, b: B, c: C, d: D ) => Z, a: Placeholder, b: B, c: C, d: D ): ( p: A ) => Z
export function placeholder <A, B, C, D, Z>( fn: ( a: A, b: B, c: C, d: D ) => Z, a: A, b: Placeholder, c: C, d: D ): ( p: B ) => Z
export function placeholder <A, B, C, D, Z>( fn: ( a: A, b: B, c: C, d: D ) => Z, a: A, b: B, c: Placeholder, d: D ): ( p: C ) => Z
export function placeholder <A, B, C, D, Z>( fn: ( a: A, b: B, c: C, d: D ) => Z, a: A, b: B, c: C, d: Placeholder ): ( p: D ) => Z
export function placeholder <A, B, C, D, E, Z>( fn: ( a: A, b: B, c: C, d: D, e: E ) => Z, a: Placeholder, b: B, c: C, d: D, e: E ): ( p: A ) => Z
export function placeholder <A, B, C, D, E, Z>( fn: ( a: A, b: B, c: C, d: D, e: E ) => Z, a: A, b: Placeholder, c: C, d: D, e: E ): ( p: B ) => Z
export function placeholder <A, B, C, D, E, Z>( fn: ( a: A, b: B, c: C, d: D, e: E ) => Z, a: A, b: B, c: Placeholder, d: D, e: E ): ( p: C ) => Z
export function placeholder <A, B, C, D, E, Z>( fn: ( a: A, b: B, c: C, d: D, e: E ) => Z, a: A, b: B, c: C, d: Placeholder, e: E ): ( p: D ) => Z
export function placeholder <A, B, C, D, E, Z>( fn: ( a: A, b: B, c: C, d: D, e: E ) => Z, a: A, b: B, c: C, d: D, e: Placeholder ): ( p: E ) => Z
/**
 * Works on conjunction with `_` (a `Placeholder` instance) from this library
 * to provide a placeholder parameter that will be invoked at a later time.
 * @param fn foobar
 * @example
 * import { _, placeholder } from 'soultrain'
 * const friendlyTemplate = (name: string, message: string) : string => `Hello ${name}! ${message}`
 * const welcome = placeholder( friendlyTemplate, _ ,'Welcome to Oregon!')
 * welcome('Roxanne') // Hello Roxanne! Welcome to Oregon!
 */
export function placeholder( fn, ...placeholders ) {
  // tslint:disable-next-line:variable-name
  return untypedCurry( ( _fn, ...argsAndSlots ) => ( ...fillers ) => _fn( ...argsAndSlots.map( ( item ) => isPlaceholder( item ) ? fillers.shift() : item ) ) )( fn, ...placeholders )
}

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
  return bind.bind( bindSymbol, fn, ...args )
}

// export function papp <A, Z>( fn: ( a: A ) => Z ): ( a: A ) => Z
// export function papp <A, B, Z>( fn: ( a: A, b: B ) => Z ): ( a: A ) => Z
export function papp <A, B>( fn: ( ...a: B[] ) => A, ...partials: B[] ): ( ...args: B[] ) => A
export function papp <A, B>( fn: ( ...a: B[] ) => A ): ( ...partials: B[] ) => ( ...args: B[] ) => A
/**
 * Todo
 */
export function papp( ...args ) {
  // tslint:disable-next-line:variable-name
  return untypedCurry( ( fn, partials ) => ( ..._args ) => fn( ...partials, ..._args ) )( ...args )
}

export function pappRight <A, B>( fn: ( ...a: B[] ) => A, ...partials ): ( ...args: B[] ) => A
export function pappRight <A, B>( fn: ( ...a: B[] ) => A ): ( ...partials ) => ( ...args: B[] ) => A
/**
 * Todo
 */
export function pappRight( ...args ) {
  // tslint:disable-next-line:variable-name
  return untypedCurry( ( fn, partials ) => ( _args ) => fn( ..._args, ...partials ) )( ...args )
}

// export const pappCurry = ( ...partials ) => fn => partials.length >= fn.length
//   ? fn( ...partials )
//   : ( ...args ) => pappCurry( ...partials, ...args )( fn )

/**
 * Todo
 */
export const pappSlotsCurried = ( ...placeholders ) => ( fn ) => ( ...fills ) => {
  const processed = placeholders.map(
    ( item ) => ( isPlaceholder( item ) && fills.length ) ? fills.shift() : item,
  )
  return ( processed.find( isPlaceholder ) ? pappSlotsCurried : fn )( ...processed )
}
