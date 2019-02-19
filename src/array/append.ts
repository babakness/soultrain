/** @module array/append.ts */

import { untypedCurry } from '../function/untypedCurry'
import { Append, ValueOf } from '../helper-types'

interface IAppend<B> {
  <A extends [any, ...any[]]>( arr: A ): Append<A, B>
  <A extends any[]>( arr: A ): Array<ValueOf<A>|B>
}

export function append<B, A extends [any, ...any[]]>( item: B, arr: A ): Append<A, B>
export function append<B, A extends any[] >( item: B, arr: A ): Array<ValueOf<A>|B>
export function append<B extends Array<unknown>>( item: B ): IAppend<B>
export function append<B extends string>( item: B ): string
/**
 * Append a item onto the end of an array
 * @param item item to append onto array
 * @param arr array to append values onto
 * @sig a[] -> a -> a[]
 * @example
 * append([1,2,3])('4')
 * //=> [1,2,3,'4'] : [number, number, number, string]
 */
export function append( ...args ) {
  return untypedCurry(
    ( item, arr ) => arr.concat( [ item ] ),
  )( ...args )
}

export default append
