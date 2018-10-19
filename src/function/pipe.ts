/** @module function/pipe.ts */

import { toArray } from '../array/toArray'
import { ExtractFunctionArguments, ExtractFunctionReturnValue } from '../helper-types'

/**
 * Functional pipe, chain applies functions starting from the left and moves right
 *
 * @example
 * const myFormula = pipe( multiply(2), add(5) )
 * myFormula(10) // 25
 *
 * :: f1 |> f2 |> f3 |> ... fn
 */

export function pipe<Fn>( entry: Fn ): ( ...args: ExtractFunctionArguments<Fn> ) => ExtractFunctionReturnValue<Fn>
export function pipe<Fn, A>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A ): ( ...args: ExtractFunctionArguments<Fn> ) => A
export function pipe<Fn, A, B>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B ): ( ...args: ExtractFunctionArguments<Fn> ) => B
export function pipe<Fn, A, B, C>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C ): ( ...args: ExtractFunctionArguments<Fn> ) => C
export function pipe<Fn, A, B, C, D>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D ): ( ...args: ExtractFunctionArguments<Fn> ) => D
export function pipe<Fn, A, B, C, D, E>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E ): ( ...args: ExtractFunctionArguments<Fn> ) => E
export function pipe<Fn, A, B, C, D, E, F>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F ): ( ...args: ExtractFunctionArguments<Fn> ) => F
export function pipe<Fn, A, B, C, D, E, F, G>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G ): ( ...args: ExtractFunctionArguments<Fn> ) => G
export function pipe<Fn, A, B, C, D, E, F, G, H>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H ): ( ...args: ExtractFunctionArguments<Fn> ) => H
export function pipe<Fn, A, B, C, D, E, F, G, H, I>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I ): ( ...args: ExtractFunctionArguments<Fn> ) => I
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J ): ( ...args: ExtractFunctionArguments<Fn> ) => J
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K ): ( ...args: ExtractFunctionArguments<Fn> ) => K
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L ): ( ...args: ExtractFunctionArguments<Fn> ) => L
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M ): ( ...args: ExtractFunctionArguments<Fn> ) => M
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N ): ( ...args: ExtractFunctionArguments<Fn> ) => N
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N, no: ( n: N ) => O ): ( ...args: ExtractFunctionArguments<Fn> ) => O
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N, no: ( n: N ) => O, op: ( o: O ) => P ): ( ...args: ExtractFunctionArguments<Fn> ) => P
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N, no: ( n: N ) => O, op: ( o: O ) => P, pq: ( p: P ) => Q ): ( ...args: ExtractFunctionArguments<Fn> ) => Q
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N, no: ( n: N ) => O, op: ( o: O ) => P, pq: ( p: P ) => Q, qr: ( q: Q ) => R ): ( ...args: ExtractFunctionArguments<Fn> ) => R
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N, no: ( n: N ) => O, op: ( o: O ) => P, pq: ( p: P ) => Q, qr: ( q: Q ) => R, rs: ( r: R ) => S ): ( ...args: ExtractFunctionArguments<Fn> ) => S
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N, no: ( n: N ) => O, op: ( o: O ) => P, pq: ( p: P ) => Q, qr: ( q: Q ) => R, rs: ( r: R ) => S, st: ( s: S ) => T ): ( ...args: ExtractFunctionArguments<Fn> ) => T
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N, no: ( n: N ) => O, op: ( o: O ) => P, pq: ( p: P ) => Q, qr: ( q: Q ) => R, rs: ( r: R ) => S, st: ( s: S ) => T, tu: ( t: T ) => U ): ( ...args: ExtractFunctionArguments<Fn> ) => U
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N, no: ( n: N ) => O, op: ( o: O ) => P, pq: ( p: P ) => Q, qr: ( q: Q ) => R, rs: ( r: R ) => S, st: ( s: S ) => T, tu: ( t: T ) => U, uv: ( u: U ) => V ): ( ...args: ExtractFunctionArguments<Fn> ) => V
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N, no: ( n: N ) => O, op: ( o: O ) => P, pq: ( p: P ) => Q, qr: ( q: Q ) => R, rs: ( r: R ) => S, st: ( s: S ) => T, tu: ( t: T ) => U, uv: ( u: U ) => V, vw: ( v: V ) => W ): ( ...args: ExtractFunctionArguments<Fn> ) => W
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N, no: ( n: N ) => O, op: ( o: O ) => P, pq: ( p: P ) => Q, qr: ( q: Q ) => R, rs: ( r: R ) => S, st: ( s: S ) => T, tu: ( t: T ) => U, uv: ( u: U ) => V, vw: ( v: V ) => W, wx: ( w: W ) => X ): ( ...args: ExtractFunctionArguments<Fn> ) => X
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N, no: ( n: N ) => O, op: ( o: O ) => P, pq: ( p: P ) => Q, qr: ( q: Q ) => R, rs: ( r: R ) => S, st: ( s: S ) => T, tu: ( t: T ) => U, uv: ( u: U ) => V, vw: ( v: V ) => W, wx: ( w: W ) => X, xy: ( x: X ) => Y ): ( ...args: ExtractFunctionArguments<Fn> ) => Y
export function pipe<Fn, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>( entry: Fn, first: ( a: ExtractFunctionReturnValue<Fn> ) => A , ab: ( a: A ) => B, bc: ( b: B ) => C, cd: ( c: C ) => D, de: ( d: D ) => E, ef: ( e: E ) => F, fg: ( f: F ) => G, gh: ( g: G ) => H, hi: ( h: H ) => I, ij: ( i: I ) => J, jk: ( j: J ) => K, kl: ( k: K ) => L, lm: ( l: L ) => M, mn: ( m: M ) => N, no: ( n: N ) => O, op: ( o: O ) => P, pq: ( p: P ) => Q, qr: ( q: Q ) => R, rs: ( r: R ) => S, st: ( s: S ) => T, tu: ( t: T ) => U, uv: ( u: U ) => V, vw: ( v: V ) => W, wx: ( w: W ) => X, xy: ( x: X ) => Y, yz: ( y: Y ) => Z ): ( ...args: ExtractFunctionArguments<Fn> ) => Z
export function pipe( entry, ...funcs ) {
  return ( ...arg ) => funcs.reduce( ( acc, item ) => item.call( item, acc ), entry( ...arg ) )
}

export default pipe
