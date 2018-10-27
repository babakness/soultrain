/** @module array/last.ts */

import { Last, Reverse } from '../helper-types'

export function last <A extends any[]>( arr: A ): Last<A>
/**
 * Return last item in array
 * @param arr array to return last item of
 * @sig a[] -> a
 * @example
 * last( [ 1, 2, 3 ] ) // 3
 */
export function last( arr ) {
  return arr[ arr.length - 1 ]
}

export default last
