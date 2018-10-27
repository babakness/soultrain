/** @module array/indexValue.ts */

import { untypedCurry } from '../function'
import { ValueAt } from '../helper-types'

export function indexValue<A extends any[], I extends number>( index: I, arr: A ): ValueAt<A, I>
export function indexValue<I extends number>( index: I ): <A extends any[]>( arr: A ) => ValueAt<A, I>
/**
 * Get the value of an array at a given index
 *
 * @param index index to look up on array
 * @param arr array to get index from
 * @sig a[] -> a
 * @example
 * indexValue( 1 )([ 1 ,2 ,3 ]) //=> 2
 *
 */
export function indexValue( ...args ) {
  return untypedCurry( ( index, arr ) => arr[ index ] )( ...args )
}
