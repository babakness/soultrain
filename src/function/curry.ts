/** @module function/curry.ts */

import { Curried1, Curried2, Curried3, Curried4, Curried5, Curried6, Curried7, Curried8, Curried9, Function1, Function2, Function3, Function4, Function5, Function6, Function7, Function8, Function9, Function_21, Function_211, Function_2111, Function_31, Function_311, Function_41, Function_51, Function_61, Predicate } from '../helper-types'
import { defineFunctionProperties } from './defineFunctionProperties'
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
export function curry<A, B>( f: Function1<A, B> ): ( Curried1<A, B> & Function1<A, B> )
export function curry<A, B, C>( f: Function2<A, B, C> ): ( Curried2<A, B, C> & Function2<A, B, C> )
// tslint:disable-next-line:unified-signatures
export function curry<A, B, C>( f: Function2<A[], B, C> ): ( Curried2<A, B, C> & Function2<A, B, C> )
// tslint:disable-next-line:unified-signatures
export function curry<A, B, C>( f: Function2<A, B[], C> ): ( Curried2<A, B, C> & Function2<A, B, C> )
// tslint:disable-next-line:unified-signatures
export function curry<A, B, C>( f: Function2<A[], B[], C> ): ( Curried2<A, B, C> & Function2<A, B, C> )
export function curry<A, B, C, D>( f: Function3<A, B, C, D> ): ( Curried3<A, B, C, D> & Function3<A, B, C, D> & Function_21<A, B, C, D> )
export function curry<A, B, C, D, E>( f: Function4<A, B, C, D, E> ): ( Curried4<A, B, C, D, E> & Function4<A, B, C, D, E> & Function_211<A, B, C, D, E> & Function_31<A, B, C, D, E> )
export function curry<A, B, C, D, E, F>( f: Function5<A, B, C, D, E, F> ): ( Curried5<A, B, C, D, E, F> & Function5<A, B, C, D, E, F> & Function_2111<A, B, C, D, E, F> & Function_311<A, B, C, D, E, F> & Function_41<A, B, C, D, E, F> )
export function curry<A, B, C, D, E, F, G>( f: Function6<A, B, C, D, E, F, G> ): ( Curried6<A, B, C, D, E, F, G> & Function6<A, B, C, D, E, F, G> & Function_51<A, B, C, D, E, F, G> )
export function curry<A, B, C, D, E, F, G, H>( f: Function7<A, B, C, D, E, F, G, H> ): ( Curried7<A, B, C, D, E, F, G, H> & Function7<A, B, C, D, E, F, G, H> & Function_61<A, B, C, D, E, F, G, H> )
export function curry<A, B, C, D, E, F, G, H, I>( f: Function8<A, B, C, D, E, F, G, H, I> ): Curried8<A, B, C, D, E, F, G, H, I>
export function curry<A, B, C, D, E, F, G, H, I, J>( f: Function9<A, B, C, D, E, F, G, H, I, J> ): Curried9<A, B, C, D, E, F, G, H, I, J>
export function curry( fn, ...args: any[] ) {
  return args.length >= fn.length ? fn( ...args ) : defineFunctionProperties( curry.bind( null, fn, ...args ), {
    length: fn.length - args.length,
    name: fn.name,
  } )
}

export default curry
