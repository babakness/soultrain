/** @module array/drop.ts */

import { remove } from './remove'

interface Drop {
  <A>( count: number, arr: A[] ): A[]
  <A>( count: number ): ( arr: A[] ) => A[]
}

/**
 * Drops the given count of items from the beginning of the array
 * @param count number of items to remove
 * @param arr items to remove from array copy
 * @sig n -> a[] -> a[]
 */
export const drop: Drop = remove( 0 )

export default drop
