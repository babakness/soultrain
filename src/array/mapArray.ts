/** @module array/mapArray.ts */

import { times } from '../flow'
import { untypedCurry } from '../function/untypedCurry'
import { Equals } from '../helper-types'

export function mapArray<A, Fn extends ( item: A ) => any>( fn: Fn, arr: A[] ): Fn extends ( item: any ) => infer B ? B[] : never
export function mapArray<A, T >( fn: ( a: A ) => T ): ( arr: A[] ) => T[]
/**
 * Maps / applies a function over the items in an array
 * @param fn function applied over items in array, must match array item type
 * @param arr array to map function over
 * @sig ( f -> a -> b ) -> a[] -> b[]
 * mapArray( (x: number) => x + 1, [1,2,3])
 * //=> [2,3,4]
 */
export function mapArray( ...args ) {
  return untypedCurry( ( fn, arr ) => times( ( index ) => fn( arr[ index ] ), arr.length ) )( ...args )
}

export default mapArray
