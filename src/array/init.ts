/** @module array/init.ts */

import { Init } from '../helper-types'
/**
 * Get the items of array before the last item
 * @param arr array to get all but last item from
 * @sig a[] -> a[]
 * @example
 * init( [ 1, 2, 3, 4 ] )
 * //=> [ 1, 2, 3 ] : [ 2, 3 ]
 *
 */
export function init<T extends [any, ...any[]]>( arr: T ): Init<T>
export function init<T>( arr: T[] ): T[]
export function init( arr ) {
  return arr.slice( 0, -1 )
}

export default init
