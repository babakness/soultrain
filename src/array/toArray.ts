/** @module array/toArray.ts */

import { ItemInsideIterable } from '../helper-types'
import { mapIterable } from '../iterables'
/**
 * Takes an iterable and returns an array
 * @param iterable
 * @sig Iterable<a> -> a[]
 * toArray('abc') //=> ['a','b','c']
 * toArray(document.querySelector('div')) //=> [Element,...]
 */

// export function toArray<A extends Node>( iterable: NodeListOf<A> ): A[]

export function toArray<A>( iterable: A ): Array<ItemInsideIterable<A>>
export function toArray( iterable ) {
  return mapIterable( ( a ) => a, iterable )
}
