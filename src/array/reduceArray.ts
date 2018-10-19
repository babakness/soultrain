/** @module array/reduceArray.ts */
import { untypedCurry } from '../function/untypedCurry'
interface ReduceArrayCurried<A, V> {
  ( initialValue: V, arr: A[] ): V
  ( initialValue: V ): ( arr: A[] ) => V
}

/**
 * Reduce an array
 *
 * @param reducerFn function that reduces the function
 * @param initialValue initial value (and final type) array is catamorphised into
 * @param arr the array to reduce
 * @example
 * reduceArray( (acc,item) => acc + item, 0, [1,2,3,4] )
 * // => 10
 */
export function reduceArray<A, V>( reducerFn: ( acc: V, item: A ) => V, initialValue: V, arr: A[] ): V
export function reduceArray<A, V>( fn: ( acc: V, item: A ) => V, initialValue: V ): ( arr: A[] ) => V
export function reduceArray<A, V>( fn: ( acc: V, item: A ) => V ): ReduceArrayCurried<A, V>
export function reduceArray( ...args ) {
  return untypedCurry( ( fn, initialValue, arr ) => arr.reduce( fn, initialValue ) )( ...args )
}
