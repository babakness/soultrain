/** @module array/reverse.ts */

import { IsFinite, Reverse } from '../helper-types'

export function reverse<A extends any[]>( arr: A ): IsFinite<A> extends true ? Reverse<A> : A
/**
 * Takes an array an returns a copy reversed
 * @param arr array to reverse
 * @sig a[] -> a[]
 * @example
 * reverse([1,2,3])
 * //=> [3,2,1]
 */
export function reverse( arr ) {
  return arr.slice().reverse()
}

export default reverse
