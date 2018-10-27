/** @module iterable/indexOf.ts */

import { equals } from '../equals'
import { untypedCurry } from '../function/untypedCurry'
export function indexOf( item: unknown, itr: Iterable<unknown> | NodeList | NodeListOf<any> ): number
export function indexOf( item: unknown ): ( itr: Iterable<unknown> | NodeList | NodeListOf<any> ) => number
/**
 * Get the index of an item in an iterable. Objects and Arrays are compared in terms of value equality, not reference equality.
 * @param item Item to find in iterable
 * @param itr Iterable to find item in
 * @sig item -> iterable -> n
 * @example
 * indexOf( {a: 10}, [ {a: 9}, {a: 10}, {a: 11}] )
 * //=> 1
 */
export function indexOf( ...args ) {
  return untypedCurry( ( item, itr ) => {
    let counter = 0
    for ( const i of itr ) {
      if ( equals( i, item ) ) {
        return counter
      }
      counter++
    }
    return -1
  } )( ...args )
}
