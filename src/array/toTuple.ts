/** @module array/toTuple.ts */

import { untypedCurry } from '../function/untypedCurry'
export function toTuple<A, B>( a: A, b: B ): [A, B]
export function toTuple<A, B>( a: A ): ( b: B ) => [A, B]
/**
 * Takes two parameters (curried) and returns an array pair containing one of each item
 * @sig a -> b -> [a,b]
 * @category array
 * @param a
 * @param b
 * @example
 * toTuple(1,2)
 * //=> [1,2]
 */
export function toTuple( ...args ) {
  return untypedCurry( ( a, b ) => [ a, b ] )( ...args )
}
