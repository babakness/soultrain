/** @module array/tail.ts */

import { Tail } from '../helper-types'

export function tail<T extends [any, ...any[]]>( arr: T ): Tail<T>
export function tail<T extends any[]>( arr: T ): T
export function tail<T extends string>( arr: T ): T
/**
 * Get all but the head element of an array
 * @param arr array to retrieve tail from
 * @sig a[] -> a[]
 * @example
 * tail( [ 1 , 2,  3, 4 ] ) // [ 2, 3, 4 ]
 *
 */
export function tail( arr ) {
  return arr.slice( 1 )
}

export default tail
