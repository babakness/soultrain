/** @module array/toTuple.ts */
import { untypedCurry } from '../function/untypedCurry'
/**
 * Takes two parameters (curried) and returns an array pair containing one of each item
 * @sig a -> b -> [a,b]
 * @category array
 * @param {A} a
 * @param {B} b
 * @returns {[A,B]}
 * @example
 *
 */
export function toTuple<A, B>( a: A, b: B ): [A, B]
export function toTuple<A, B>( a: A ): ( b: B ) => [A, B]
export function toTuple( ...args ) {
  return untypedCurry( ( a, b ) => [ a, b ] )
}
