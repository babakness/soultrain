/** @module array/pushArray.ts */

import { untypedCurry } from '../function/untypedCurry'
import { Append, ValueOf } from '../helper-types'
export function pushArray<A extends [any, ...any[]], B>( arr: A, item: B ): A extends any[] ? Append<A, B>: any
export function pushArray<A extends [any, ...any[]], B>( arr: A ): ( item: B ) =>  A extends any[] ? Append<A, B>: any
export function pushArray<A extends any[], B>( arr: A, item: B ): Array<ValueOf<A>|B>
export function pushArray<A extends any[]>( arr: A ): <B>( item: B ) => Array<ValueOf<A>|B>
/**
 * Push a item onto the end of an array
 * @param arr array to push values onto
 * @param item item to push onto array
 * @sig a[] -> a -> a[]
 * @example
 * pushArray([1,2,3])('4')
 * //=> [1,2,3,'4'] : [number, number, number, string]
 */
export function pushArray( ...args ) {
  return untypedCurry( ( arr, item ) => arr.concat( [ item ] ) )
}
