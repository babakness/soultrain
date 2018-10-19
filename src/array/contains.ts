/** @module array/contains.ts */
import { untypedCurry } from '../function/untypedCurry'
/**
 * Predicate returns true if array contains specified item
 * @sig a[] -> a -> bool
 * @param arr array to check for item presence
 * @param item item to check presence of in array
 * @example
 * includes([1,2,3])(1) // true
 */
export function contains<A>( arr: A[], item: A ): boolean
export function contains<A>( arr: A[] ): ( item: A ) => boolean
export function contains( ...args ) {
  return untypedCurry( ( arr, item ): boolean => arr.indexOf( item ) > -1 )( ...args )
}

export default contains
