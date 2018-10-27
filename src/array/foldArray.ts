/** @module array/foldArray.ts */

import { untypedCurry } from '../function/untypedCurry'
export interface FoldArrayCurried<A, V> {
  ( fn: ( acc: V, item: A ) => V ): ( arr: A[] ) => V
  ( fn: ( acc: V, item: A ) => V, arr: A[] ): V
}

export function foldArray<A, V>( initial: V, fn: ( acc: V, item: A ) => V, arr: A[] ): V
export function foldArray<A, V>( initialValue: V, fn: ( acc: V, item: A ) => V ): ( arr: A[] ) => V
export function foldArray<A, V>( initialValue: V ): FoldArrayCurried<A, V>
/**
 * Folds an array -- like reduce. Here we have initial and fn parameters
 * positions are flipped for convenience
 *
 * @param initial
 * @param fn
 * @param arr
 * @sig b -> ( (b,a) -> b ) -> a[] -> b
 * @example
 * foldArray( 0, (acc,item) => acc + item, [1,2,3] )
 * //=> 6 : number
 */
export function foldArray( ...args ) {
  return untypedCurry( ( initialValue, fn, arr ) => arr.reduce( fn, initialValue ) )( ...args )
}
