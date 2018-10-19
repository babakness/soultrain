/** @module array/slice.ts */

import { untypedCurry } from '../function'

interface SliceCurried {
  <A>( end: number,  arr: A[] ): A[]
  ( end: number ): <A>( arr: A[] ) => A[]

}

interface Slice {
  <A>( start: number, end: number, arr: A[] ): A[]
  ( start: number, end: number ): <A>( arr: A[] ) => A[]
  ( start: number ): SliceCurried
}

/**
 * Takes arguments for slice, an array, and returns sliced array
 * @param start index to start the slice
 * @param end index to end the slice
 * @param arr array to slice from
 * @sig (...args) -> a[] -> a[]
 * @example
 * slice( 2, 4, [1,2,3,4,5,6,7] )
 * // => [3,4]
 */
export const slice: Slice = untypedCurry(
  ( start, end, arr ) => arr.slice( start, end ),
)

export default slice
