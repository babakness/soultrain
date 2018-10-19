/** @module array/toArray.ts */

import { mapIterable } from '../iterables'
/**
 * Takes an iterable and returns an array
 * @param iterable
 * @sig Iterable<a> -> a[]
 * toArray('abc') //=> ['a','b','c']
 * toArray(document.querySelector('div')) //=> [Element,...]
 */

export function toArray<A>( iterable: Iterable<A> ): A[]
// export function toArray<A extends Node>( iterable: NodeListOf<A> ): A[]
export function toArray( iterable ) {
  return mapIterable( ( a ) => a, iterable )
}
