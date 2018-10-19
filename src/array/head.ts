/** @module array/head.ts */
import { BasicTypes, Head, IsArray, Literal, ValueAt, WidenType } from '../helper-types'
/**
 * Return first item in array
 *
 * @param arr array to take first element of
 * @sig a[] -> a
 * @example
 * head( [ 1, 2, 3 ] ) // 1 : number
 *
 */
export function head<A extends any[]>( arr: A ): Head<A>
export function head( arr ) {
  return arr[ 0 ]
}
export default head
