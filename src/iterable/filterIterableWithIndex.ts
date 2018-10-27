/** @module iterable/filterIterableWithIndex.ts */

import { untypedCurry } from '../function/untypedCurry'
import { FilterIterable } from './filterIterable'
type PredicateWithIndex<A> = ( item: A, index: number ) => boolean
export function filterIterableWithIndex<A>( fn: PredicateWithIndex<A>, itr: Iterable<A> ): A[]
export function filterIterableWithIndex<A extends Node>( fn: PredicateWithIndex<A>, itr: NodeListOf<A> ): A[]
export function filterIterableWithIndex<A>( fn: PredicateWithIndex<A> ): FilterIterable<A>
export function filterIterableWithIndex<A extends Node>( fn: PredicateWithIndex<A> ): FilterIterable<A>
/**
 * Filter an iterable, return an array with filtered items
 * @param fn Predicate takes an item from the list and the items index
 * @param itr Iterable containing items
 * @sig ( item -> bool ) -> iterable<item> -> n
 * @example
 * indexOf( {a: 10}, [ {a: 9}, {a: 10}, {a: 11}] )
 * //=> 1
 */
export function filterIterableWithIndex( ...arg ) {
  return untypedCurry( ( fn, itr ) => {
    const arr: any[] = []
    let index = 0
    for ( const i of itr ) {
      if ( fn( i, index ) === true ) {
        arr.push( i )
      }
      index++
    }
    return arr
  } )
}
