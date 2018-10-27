/** @module array/takeArray.ts */

import { untypedCurry } from '../function'

interface TakeArray {
  <T, N extends number>( n: N, arr: T[] ): T[]
  <N extends number>( n: N ): <T>( arr: T[] ) => T[]
}
/**
 * Take a given number of items from an arraay
 *
 * @param n number of items to take from the beginning of the array
 * @param arr array to take items from
 * @sig n -> a[] -> a[]
 * takeArray(2, [1,2,3,4]) // [1,2]
 *
 */
export const takeArray: TakeArray = untypedCurry( ( n, arr ) => arr.slice( 0, n ) )
