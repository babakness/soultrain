/** @module array/filterArray.ts */

import { untypedCurry } from '../function'
import { Predicate2 } from '../helper-types'

const _filterArray = <A>( fn: Predicate2<A, number>, arr: A[] ): A[] => arr.filter( fn )

export function filterArray<A>( fn: Predicate2<A, number>, arr: A[] ): A[]
export function filterArray<A>( fn: Predicate2<A, number> ): ( arr: A[] ) => A[]
/**
 * Filter elements of an array with a given predicate function
 * @sig fn -> a[] -> a[]
 * @param fn predicate function taking item from array and index returns true for values to keep
 * @param arr array to filter
 * @example
 * filterArray( (_,n) => (n + 1) % 2 === 0, [1,2,3,4] )
 * //=> [1,2]
 */
export function filterArray<A>( ...args ) {
  return untypedCurry( _filterArray )( ...args )
}
