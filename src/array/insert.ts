/** @module array/insert.ts */

import { untypedCurry } from '../function/untypedCurry'
interface PushIndexPossibleCurried {
  <A, B>( arr: A[], value: B ): Array<A | B>
  <A>( arr: A[] ): <B>( value: B ) => Array<A | B>
}
/**
 * Insert/push a value into an array at given index
 *
 * @param index index of array to insert value
 * @param arr array to insert value at index into
 * @param value value to insert into array
 * @example
 *
 */
export function insert<A, B>( index: number, arr: A[], value: B ): Array<A | B>
export function insert<A>( index: number, arr: A[] ): <B>( value: B ) => Array<A | B>
export function insert( index: number ): PushIndexPossibleCurried
export function insert( ...args ) {
  return untypedCurry( ( index, arr, value ) => [ ...arr.slice( 0, index ), value, ...arr.slice( index, arr.length ) ] )( ...args )
}
