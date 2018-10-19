/** @module array/headTuple.ts */

import { BasicTypes, Literal, ValueAt } from '../helper-types'
/**
 * Return first item in array, specifically tuned for literal tuples
 *
 * @param arr array to take first element of
 * @sig a[] -> a
 * @example
 * head( [ 1, 2, 3 ] ) // 1
 *
 */
export function headTuple<_A extends BasicTypes, A extends Literal<_A>>( arr: A ): ValueAt<A, 0>
export function headTuple( arr ) {
  return arr[ 0 ]
}
