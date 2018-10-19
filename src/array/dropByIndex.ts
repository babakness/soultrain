/** @module array/dropByIndex.ts */

import { untypedCurry } from '../function/untypedCurry'
interface DropPossibleCurried {
  <A>( index: number, arr: A[] ): A[]
  <A>( index: number ): ( arr: A[] ) => A[]
}
/**
 * Drop removes a given number of items from an array at a specific index.
 * Drop is similar to remove; the order of the first to parameters is reversed
 *
 * @param count the number of items to remove from array
 * @param index index to start removing items
 * @param arr array to remove items from
 * @sig n -> n -> a[] -> a[]
 */
export function dropByIndex<A>( count: number, index: number, arr: A[] ): A[]
export function dropByIndex<A>( count: number, index: number ): ( arr: A[] ) => A[]
export function dropByIndex( count: number ): DropPossibleCurried
export function dropByIndex( ...args ) {
  return untypedCurry( <A>( count, index, arr ): A[] => [ ...arr.slice( 0, index ), ...arr.slice( index + count, arr.length ) ] )( ...args )
}

export default dropByIndex
