/** @module array/toArrayReverse.ts */

import { pipeline } from '../function/pipeline'
import { ItemInsideIterable} from '../helper-types'
import { reverse } from './reverse'
import { toArray } from './toArray'
/**
 * Takes any iterable and returns the reverse as an array
 * :: Iter -> a[]
 */
// export function toArrayReverse<A extends Node>( iterable: NodeListOf<A> ): A[]
export function toArrayReverse<A>( iterable: A ): Array<ItemInsideIterable<A>>
export function toArrayReverse( iter ) {
  return pipeline( iter, toArray, reverse )
}
