/** @module iterable/filterIterable.ts */

import { untypedCurry } from '../function/untypedCurry'
import { Predicate } from '../helper-types'
export type FilterIterable<A> = A extends Node ? ( itr: NodeListOf<A> ) => A[] : ( itr: Iterable<A> ) => A[]
export function filterIterable<A>( fn: Predicate<A>, itr: Iterable<A> ): A[]
export function filterIterable<A extends Node>( fn: Predicate<A>, itr: NodeListOf<A> ): A[]
export function filterIterable<A>( fn: Predicate<A> ): FilterIterable<A>
export function filterIterable<A extends Node>( fn: Predicate<A> ): FilterIterable<A>
/**
 * Filter an iterable, return an array with filtered items
 * @param fn Predicate takes an item from the list and the items index
 * @param itr Iterable containing items
 * @sig ( item -> bool ) -> iterable<item> -> n
 * @example
 * indexOf( {a: 10}, [ {a: 9}, {a: 10}, {a: 11}] )
 * //=> 1
 */
export function filterIterable( ...arg ) {
  return untypedCurry( ( fn, itr ) => {
    const arr: any[] = []
    for ( const i of itr ) {
      if ( fn( i ) === true ) {
        arr.push( i )
      }
    }
    return arr
  } )
}
