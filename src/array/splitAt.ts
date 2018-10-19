/** @module array/splitAt.ts */

import { untypedCurry } from '../function/untypedCurry'
/**
 * Split an array at a given index
 * @param index
 * @sig n -> a[] -> [ a[], a[] ]
 * @example
 * splitAt(2,[1,2,3,4,5,6]) // [ [1,2],[3,4,5,6] ]
 */

interface SplitAt {
  <A>( index: number, arr: A[] ): [A[], A[]]
  <A>( index: number ): ( arr: A[] ) => [A[], A[]]
}

export const splitAt: SplitAt =  untypedCurry( ( index, arr ) => [
  arr.slice( 0, index ),
  arr.slice( index, Infinity ),
] )
