/** @module array/unshiftArray.ts */

import { untypedCurry } from '../function/untypedCurry'
import { Prepend, ValueOf } from '../helper-types'

/**
 * Unshift / prepend a item onto the beginning of an array
 * @param item item to unshift onto array
 * @param arr array to unshift values onto
 * @sig a[] -> a -> a[]
 * @example
 * unshift([1,2,3])('4')
 * //=> ['4',1,2,3] : [string, number, number, number]
 */
export function unshiftArray<A extends [any, ...any[]], B>( arr: A, item: B ): Prepend<A, B>
export function unshiftArray<A extends [any, ...any[]], B>( arr: A ): ( item: B ) => Prepend<A, B>
export function unshiftArray<A extends any[], B>( arr: A, item: B ): Array<ValueOf<A>|B>
export function unshiftArray<A extends any[]>( arr: A ): <B>( item: B ) => Array<ValueOf<A>|B>
export function unshiftArray( ...args ) {
  return untypedCurry( ( arr, item ) => arr.slice().unshift( item ) )
}
