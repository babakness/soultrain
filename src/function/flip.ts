/** @module function/flip.ts */
import { Curried as FlipCurried, Curried2, Function2} from '../helper-types'
import { untypedCurry } from './untypedCurry'
/**
 * FLIP
 */
// const _flip1 = untypedCurry(( f, a, b ) => ( f )( b )( a ))
// const _flip2 = untypedCurry(( f, a, b ) =>  f( b,  a ))
// export function flip<A,B,C>( f : (Function2<A,B,C> & Curried2<A,B,C>), b: B, a: A): C
// export function flip<A,B,C>( f : (Function2<A,B,C> & Curried2<A,B,C>), b: B) : (a: A) => C
// export function flip<A,B,C>( f : (Function2<A,B,C> & Curried2<A,B,C>)) : ( b: B ) => ( a: A) => C
// export function flip(...args) {
//   return head(args).length <= 1 ? _flip1(...args) : _flip2(...args)
// }
/**
 * Flip parameters of a function.
 * Takes a function and two parameters and flips the parameter order
 *
 * @example
 * const doubleThenAdd = flip( addThenDouble )
 *
 * :: f -> a -> b -> f(b)(a)
 */
export function flip<A, B, Z>( fn: Curried2<A, B, Z>, b: B, a: A ): Z
export function flip<A, B, Z>( fn: Curried2<A, B, Z>, b: B ): ( a: A ) => Z
export function flip<A, B, Z>( fn: Curried2<A, B, Z> ): FlipCurried<A, B, Z>
// tslint:disable-next-line:unified-signatures
export function flip<A, B, Z>( fn: Function2<A, B, Z>, b: B, a: A ): Z
// tslint:disable-next-line:unified-signatures
export function flip<A, B, Z>( fn: Function2<A, B, Z>, b: B ): ( a: A ) => Z
// tslint:disable-next-line:unified-signatures
export function flip<A, B, Z>( fn: Function2<A, B, Z> ): FlipCurried<A, B, Z>
export function flip( ...args ) {
  return untypedCurry( ( fn, b, a ) => fn.length === 1 ? fn( a )( b ) : fn( a, b ) )( ...args )
}

export default flip
