/** @module array/chunk.ts */

import { untypedCurry } from '../function/untypedCurry'
// tslint:disable-next-line:variable-name
const _chunk = untypedCurry( ( n: number, arr: any[] ) => !arr.length
  ? []
  : [ arr.slice( 0, n ) ].concat( _chunk( n, arr.slice( n ) ) ) )
/**
 * Takes a number n and an array, returns new array with items grouped every n
 * @sig n -> a[] -> a[][]
 * @param n groups items from array into tuples of length n
 * @param arr array to group from
 * @example
 * chunk( 2, [1,2,3,4,5,6])
 * //=> [ [1,2], [3,4], [5,6] ]
 */
export function chunk<A>( n: number, arr: A[] ): A[][]
export function chunk<A>( n: number ): ( arr: A[] ) => A[][]
export function chunk( ...args ) {
  return _chunk( ...args )
}

export default chunk
