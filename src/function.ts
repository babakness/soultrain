import { HKT, Type, URIS, } from 'fp-ts/lib/HKT'
import {  
  Curried2,
  Curried3,
  Curried4,
  Curried5,
  Curried6,
  Curried7,
  Curried8,
  Curried9,
  Function1,
  Function2,
  Function3,
  Function4,
  Function5,
  Function6,
  Function7,
  Function8,
  Function9,
  Function_21,
  Function_211,
  Function_2111,
  Function_31,
  Function_311,
  Function_41,
  Function_51,
  Function_61,
  Complement
 } from './helper-types'
import { head } from './array'

export const define = Object.defineProperty.bind(Object);

export const defineFunctionProperties = <A>(fn:A,obj: object):A => ( 
  Object.entries(obj)
    .reduce( (acc,[k,v]) => 
      (define(acc, k, { value: v, writable: false, enumerable: false, configurable: true }),acc),
      fn
    ),
  fn
)

/**
 * Functional pipe, chain applies functions starting from the left and moves right
 * 
 * @example
 * const myFormula = pipe( multiply(2), add(5) ) 
 * myFormula(10) // 25
 * 
 * :: f1 |> f2 |> f3 |> ... fn
 */

export function pipe<A, B>(ab: (a: A) => B ): (a: A) => B
export function pipe<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C
export function pipe<A, B, C, D>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (a: A) => D
export function pipe<A, B, C, D, E>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): (a: A) => E
export function pipe<A, B, C, D, E, F>(ab: (a: A) => B,bc: (b: B) => C,cd: (c: C) => D,de: (d: D) => E,ef: (e: E) => F): (a: A) => F
export function pipe<A, B, C, D, E, F, G>(ab: (a: A) => B,bc: (b: B) => C,cd: (c: C) => D,de: (d: D) => E,ef: (e: E) => F,fg: (f: F) => G): (a: A) => G
export function pipe<A, B, C, D, E, F, G, H>(ab: (a: A) => B,bc: (b: B) => C,cd: (c: C) => D,de: (d: D) => E,ef: (e: E) => F,fg: (f: F) => G,gh: (g: G) => H): (a: A) => H
export function pipe<A, B, C, D, E, F, G, H, I>(ab: (a: A) => B,bc: (b: B) => C,cd: (c: C) => D,de: (d: D) => E,ef: (e: E) => F,fg: (f: F) => G,gh: (g: G) => H,hi: (h: H) => I): (a: A) => I
export function pipe<A, B, C, D, E, F, G, H, I, J>(ab: (a: A) => B,bc: (b: B) => C,cd: (c: C) => D,de: (d: D) => E,ef: (e: E) => F,fg: (f: F) => G,gh: (g: G) => H,hi: (h: H) => I,ij: (i: I) => J): (a: A) => J
export function pipe ( ...funcs: Function[] ): Function {
  return arg => funcs.reduce( ( acc, item ) => item( acc ), arg )
} 

/**
 * Functional composition, chain applies functions starting from the end and moves left
 * 
 * @example
 * const myFormula = compose( add(5), multiply(2) ) 
 * myFormula(10) // 25
 * 
 * :: fn |> ... f3 |> f2 |> f1
 */
export function compose<A, B, C>(bc: (b: B) => C, ab: (a: A) => B): (a: A) => C
export function compose<A, B, C, D>(cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => D
export function compose<A, B, C, D, E>(de: (d: D) => E, cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => E
export function compose<A, B, C, D, E, F>(ef: (e: E) => F,de: (d: D) => E,cd: (c: C) => D,bc: (b: B) => C,ab: (a: A) => B): (a: A) => F
export function compose<A, B, C, D, E, F, G>(fg: (f: F) => G,ef: (e: E) => F,de: (d: D) => E,cd: (c: C) => D,bc: (b: B) => C,ab: (a: A) => B): (a: A) => G
export function compose<A, B, C, D, E, F, G, H>(gh: (g: G) => H,fg: (f: F) => G,ef: (e: E) => F,de: (d: D) => E,cd: (c: C) => D,bc: (b: B) => C,ab: (a: A) => B): (a: A) => H
export function compose<A, B, C, D, E, F, G, H, I>(hi: (h: H) => I,gh: (g: G) => H,fg: (f: F) => G,ef: (e: E) => F,de: (d: D) => E,cd: (c: C) => D,bc: (b: B) => C,ab: (a: A) => B): (a: A) => I
export function compose<A, B, C, D, E, F, G, H, I, J>(ij: (i: I) => J,hi: (h: H) => I,gh: (g: G) => H,fg: (f: F) => G,ef: (e: E) => F,de: (d: D) => E,cd: (c: C) => D,bc: (b: B) => C,ab: (a: A) => B): (a: A) => J
export function compose ( ...funcs: Function[] ): Function {
  return arg => funcs.reduceRight( ( acc, item ) => item( acc ), arg )
} 

/**
 * A function similar to `pipe`, however, it starts with the input parameter first.
 * 
 * @example
 * pipeline( 10, multiply(2), add(5) ) // 25
 * :: input |> f1 |> f2 |> f3 |> ...fn
 */
export function pipeline<A, B>(a: A, ab: (a: A) => B) : B
export function pipeline<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
export function pipeline<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
export function pipeline<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E
export function pipeline<A, B, C, D, E, F>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F): F
export function pipeline<A, B, C, D, E, F, G>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G): G
export function pipeline<A, B, C, D, E, F, G, H>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H): H
export function pipeline<A, B, C, D, E, F, G, H, I,>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I): I
export function pipeline<A, B, C, D, E, F, G, H, I, J>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J): J
export function pipeline<A, B, C, D, E, F, G, H, I, J, K>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K): K
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L): L
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M): M
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N): N
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O): O
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P): P
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q): Q
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R): R
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S): S
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S, st: (s: S) => T): T
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S, st: (s: S) => T, tu: (t: T) => U): U
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S, st: (s: S) => T, tu: (t: T) => U, uv: (u: U) => V): V
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S, st: (s: S) => T, tu: (t: T) => U, uv: (u: U) => V, vw: (v: V) => W): W
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S, st: (s: S) => T, tu: (t: T) => U, uv: (u: U) => V, vw: (v: V) => W, wx: (w: W) => X): X
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S, st: (s: S) => T, tu: (t: T) => U, uv: (u: U) => V, vw: (v: V) => W, wx: (w: W) => X, xy: (x: X) => Y): Y
export function pipeline<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: G) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S, st: (s: S) => T, tu: (t: T) => U, uv: (u: U) => V, vw: (v: V) => W, wx: (w: W) => X, xy: (x: X) => Y, yz: (y: Y) => Z): Z
export function pipeline( this: any, input, ...fns ){
  return pipe.apply( this, fns )( input )
}


/**
 * Curries a function.
 * 
 * @example
 * add = curry( (a: number, b: number): number => a + b )
 * const increment = add(1)
 * increment( 10 ) // 11
 * 
 * :: ( fn( a, b, ... c) -> x ) -> fn -> a -> b -> c -> x
 */
export function curry<A, B, C>(f: Function2<A, B, C>): (Curried2<A, B, C> & Function2<A, B, C>)
export function curry<A, B, C>(f: Function2<A[], B, C>): (Curried2<A, B, C> & Function2<A, B, C>)
export function curry<A, B, C>(f: Function2<A, B[], C>): (Curried2<A, B, C> & Function2<A, B, C>)
export function curry<A, B, C>(f: Function2<A[], B[], C>): (Curried2<A, B, C> & Function2<A, B, C>)
export function curry<A, B, C, D>(f: Function3<A, B, C, D>): (Curried3<A, B, C, D> & Function3<A, B, C, D> & Function_21<A, B, C, D>)
export function curry<A, B, C, D, E>(f: Function4<A, B, C, D, E>): (Curried4<A, B, C, D, E> & Function4<A, B, C, D, E> & Function_211<A,B,C,D,E> &  Function_31<A,B,C,D,E>)
export function curry<A, B, C, D, E, F>(f: Function5<A, B, C, D, E, F>): (Curried5<A, B, C, D, E, F> & Function5<A, B, C, D, E, F> & Function_2111<A, B, C, D, E,F> & Function_311<A, B, C, D, E,F> & Function_41<A, B, C, D, E,F>   )
export function curry<A, B, C, D, E, F, G>(f: Function6<A, B, C, D, E, F, G>): (Curried6<A, B, C, D, E, F, G> & Function6<A, B, C, D, E, F, G> & Function_51<A, B, C, D, E, F, G>)
export function curry<A, B, C, D, E, F, G, H>(f: Function7<A, B, C, D, E, F, G, H>): (Curried7<A, B, C, D, E, F, G, H> & Function7<A, B, C, D, E, F, G, H> & Function_61<A, B, C, D, E, F, G, H>)
export function curry<A, B, C, D, E, F, G, H, I>(f: Function8<A, B, C, D, E, F, G, H, I>): Curried8<A, B, C, D, E, F, G, H, I>
export function curry<A, B, C, D, E, F, G, H, I, J>(f: Function9<A, B, C, D, E, F, G, H, I, J>): Curried9<A, B, C, D, E, F, G, H, I, J>
export function curry( fn, ...args: any[] ){
    return args.length >= fn.length ? fn( ...args ) : defineFunctionProperties(curry.bind( null, fn, ...args ), {
      name: fn.name,
      length: fn.length - args.length
    })
}



/**
 * Curries a function. Untyped parameters, easily adapts to various situations, best coupled with typed signature
 * 
 * @example
 * untypedCurry( (a: any, cb: Function) => cb(a) )
 * 
 * :: ( fn( a, b, ... c) -> x ) -> fn -> a -> b -> c -> x
 */
export function untypedCurry( fn: Function, ...args ){
  return args.length >= fn.length ? fn( ...args ) : curry.bind( null, fn, ...args )
}



/**
 * Takes array of functions, array of arguments, and returns array of functions with arguments applied.
 * :: (...f) -> (...a) -> [ f1(...a),f2(...a),...]
 */
export const parallel = <A,B>( ...funcs: Array<(...args: A[]) => B >) => ( ...args:A[] ): B[] => funcs.map( func => func.apply( func, args ) )


/**
 * A looser typed version of parallel
 * :: f[] -> a[] -> [ f1(...a),f2(...a),...]
 */
export const parallelLoose = ( ...funcs: Function []) => ( ...args: any[] ): any[] => funcs.map( func => func.apply( func, args ) )



/**
 * Take a function, then its arguements, then return the boolean opposite of said function
 * :: (...args) -> (fn) -> boolean
 */
export const complement = <A>(f: (...args:A[])=> boolean ) => ( ...args: A[] ): boolean => !f( ...args )

/**
 * Take a function, then its arguements, then return the boolean opposite of said function.
 * Returns a curried function.
 * :: (...args) -> (fn) -> boolean
 */
export function complementCurry<A, B extends boolean>(f: Function1<A, B>): (Function1<A, Complement<B>>)
export function complementCurry<A, B, C extends boolean>(f: Function2<A, B, C>): (Curried2<A, B, Complement<C>> & Function2<A, B, Complement<C>>)
export function complementCurry<A, B, C extends boolean>(f: Function2<A[], B, C>): (Curried2<A, B, Complement<C>> & Function2<A, B, Complement<C>>)
export function complementCurry<A, B, C, D extends boolean>(f: Function3<A, B, C, D>): (Curried3<A, B, C, Complement<D>> & Function3<A, B, C, Complement<D>> & Function_21<A, B, C, Complement<D>>)
export function complementCurry<A, B, C, D, E extends boolean>(f: Function4<A, B, C, D, E>): (Curried4<A, B, C, D, Complement<E>> & Function4<A, B, C, D, Complement<E>> & Function_211<A,B,C,D,Complement<E>> &  Function_31<A,B,C,D,Complement<E>>)
export function complementCurry<A, B, C, D, E, F extends boolean>(f: Function5<A, B, C, D, E, F>): (Curried5<A, B, C, D, E, Complement<F>> & Function5<A, B, C, D, E, Complement<F>> & Function_2111<A, B, C, D, E,Complement<F>> & Function_311<A, B, C, D, E,Complement<F>> & Function_41<A, B, C, D, E,Complement<F>>   )
export function complementCurry<A, B, C, D, E, F, G extends boolean>(f: Function6<A, B, C, D, E, F, G>): (Curried6<A, B, C, D, E, F, Complement<G>> & Function6<A, B, C, D, E, F, Complement<G>> & Function_51<A, B, C, D, E, F, Complement<G>>)
export function complementCurry<A, B, C, D, E, F, G, H extends boolean>(f: Function7<A, B, C, D, E, F, G, H>): (Curried7<A, B, C, D, E, F, G, Complement<H>> & Function7<A, B, C, D, E, F, G, Complement<H>> & Function_61<A, B, C, D, E, F, G, Complement<H>>)
export function complementCurry<A, B, C, D, E, F, G, H, I extends boolean>(f: Function8<A, B, C, D, E, F, G, H, I>): Curried8<A, B, C, D, E, F, G, H, Complement<I>>
export function complementCurry<A, B, C, D, E, F, G, H, I, J extends boolean>(f: Function9<A, B, C, D, E, F, G, H, I, J>): Curried9<A, B, C, D, E, F, G, H, I, Complement<J>>
export function complementCurry( fn, ...args: any[] ){
  return args.length >= fn.length ? !fn( ...args ) : defineFunctionProperties(complementCurry.bind( null, fn, ...args ), {
    name: fn.name,
    length: fn.length - args.length
  })
}


export function complementWithArity( fn: Function, arity: number, ...args: any[]) : (...args:any[]) => boolean | Function {
  return args.length <= arity ? !fn( ...args ) as boolean : complementWithArity.bind( null, fn, args.length - arity, ...args )
}

export const not = <A extends boolean>(value: A): Complement<A> => !value as Complement<A>

/**
 * Constant / Kestrel. Returns the first value, ignores second.
 * 
 * @example
 * const constant5 = always(5)
 * constant5() === 5 // true
 * :: a -> b -> a
 */
export const always = <A>(a:A) => (b: any) :A => a

/**
 * Identity, returns same object given
 * @example
 * const one = identity(1) // 1
 */
export const identity = <A>(a: A): A => a


/**
 * FLIP
 */
const _flip1 = untypedCurry(( f, a, b ) => ( f )( b )( a ))
const _flip2 = untypedCurry(( f, a, b ) =>  f( b,  a ))

/**
 * Flip parameters of a function.
 * Takes a function and two parameters and flips the parameter order
 * 
 * @example
 * const doubleThenAdd = flip( addThenDouble )
 * 
 * :: f -> a -> b -> f(b)(a)
 */

export function flip<A,B,C>( f : (Function2<A,B,C> & Curried2<A,B,C>), b: B, a: A): C
export function flip<A,B,C>( f : (Function2<A,B,C> & Curried2<A,B,C>), b: B) : (a: A) => C
export function flip<A,B,C>( f : (Function2<A,B,C> & Curried2<A,B,C>)) : ( b: B, a: A) => C
export function flip(...args) {
  return head(args).length <= 1 ? _flip1(...args) : _flip2(...args)
}
