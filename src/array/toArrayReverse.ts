/** @module array/toArrayReverse.ts */

import { pipeline } from '../function/pipeline'
import { reverse } from './reverse'
import { toArray } from './toArray'
/**
 * Takes any iterable and returns the reverse as an array
 * :: Iter -> a[]
 */
interface ToArray {
  <A>( iterable: Iterable<A> ): A[]
  <A extends Node>( iterable: NodeListOf<A> ): A[]
}
export const toArrayReverse: ToArray = ( iter ) => pipeline( iter, toArray, reverse )
