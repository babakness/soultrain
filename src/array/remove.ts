/** @module array/remove.ts */

import { untypedCurry } from '../function/untypedCurry'

interface RemovePossibleCurried {
  <A>( count: number, arr: A[] ): A[]
  <A>( count: number ): ( arr: A[] ) => A[]
}
export function remove<A>( index: number, count: number, arr: A[] ): A[]
export function remove<A>( index: number, count: number ): ( arr: A[] ) => A[]
export function remove( index: number ): RemovePossibleCurried
/**
 * Removes a given number of items from an array at a specific index.
 *
 * @param index index to start removing items
 * @param count the number of items to remove from array
 * @param arr array to remove items from
 * @sig n -> n -> a[] -> a[]
 */
export function remove( ...args ) {
  return untypedCurry( <A>( index, count, arr ): A[] => [ ...arr.slice( 0, index ), ...arr.slice( index + count, arr.length ) ] )( ...args )
}

export default remove
