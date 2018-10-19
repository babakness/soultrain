/** @module function/complementCurry.ts */

import { Complement, Curried2, Curried3, Curried4, Curried5, Curried6, Curried7, Curried8, Curried9, Function1, Function2, Function3, Function4, Function5, Function6, Function7, Function8, Function9, Function_21, Function_211, Function_2111, Function_31, Function_311, Function_41, Function_51, Function_61 } from '../helper-types'
import { defineFunctionProperties } from './defineFunctionProperties'
/**
 * Take a function, then its arguements, then return the boolean opposite of said function.
 * Returns a curried function.
 * :: (...args) -> (fn) -> boolean
 */

export function complementCurry<A, B extends boolean>( f: Function1<A, B> ): ( Function1<A, Complement<B>> )
export function complementCurry<A, B, C extends boolean>( f: Function2<A, B, C> ): ( Curried2<A, B, Complement<C>> & Function2<A, B, Complement<C>> )
// tslint:disable-next-line:unified-signatures
export function complementCurry<A, B, C extends boolean>( f: Function2<A[], B, C> ): ( Curried2<A, B, Complement<C>> & Function2<A, B, Complement<C>> )
export function complementCurry<A, B, C, D extends boolean>( f: Function3<A, B, C, D> ): ( Curried3<A, B, C, Complement<D>> & Function3<A, B, C, Complement<D>> & Function_21<A, B, C, Complement<D>> )
export function complementCurry<A, B, C, D, E extends boolean>( f: Function4<A, B, C, D, E> ): ( Curried4<A, B, C, D, Complement<E>> & Function4<A, B, C, D, Complement<E>> & Function_211<A, B, C, D, Complement<E>> & Function_31<A, B, C, D, Complement<E>> )
export function complementCurry<A, B, C, D, E, F extends boolean>( f: Function5<A, B, C, D, E, F> ): ( Curried5<A, B, C, D, E, Complement<F>> & Function5<A, B, C, D, E, Complement<F>> & Function_2111<A, B, C, D, E, Complement<F>> & Function_311<A, B, C, D, E, Complement<F>> & Function_41<A, B, C, D, E, Complement<F>> )
export function complementCurry<A, B, C, D, E, F, G extends boolean>( f: Function6<A, B, C, D, E, F, G> ): ( Curried6<A, B, C, D, E, F, Complement<G>> & Function6<A, B, C, D, E, F, Complement<G>> & Function_51<A, B, C, D, E, F, Complement<G>> )
export function complementCurry<A, B, C, D, E, F, G, H extends boolean>( f: Function7<A, B, C, D, E, F, G, H> ): ( Curried7<A, B, C, D, E, F, G, Complement<H>> & Function7<A, B, C, D, E, F, G, Complement<H>> & Function_61<A, B, C, D, E, F, G, Complement<H>> )
export function complementCurry<A, B, C, D, E, F, G, H, I extends boolean>( f: Function8<A, B, C, D, E, F, G, H, I> ): Curried8<A, B, C, D, E, F, G, H, Complement<I>>
export function complementCurry<A, B, C, D, E, F, G, H, I, J extends boolean>( f: Function9<A, B, C, D, E, F, G, H, I, J> ): Curried9<A, B, C, D, E, F, G, H, I, Complement<J>>
export function complementCurry( fn, ...args: any[] ) {
  return args.length >= fn.length ? !fn( ...args ) : defineFunctionProperties( complementCurry.bind( null, fn, ...args ), {
    length: fn.length - args.length,
    name: fn.name,
  } )
}

export default complementCurry
