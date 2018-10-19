/** @module array/arrayItemsMeetPredicate.ts */

import { untypedCurry } from '../function/untypedCurry'
import { Predicate2 } from '../helper-types'
// tslint:disable-next-line:variable-name
const _arrayItemsMeetPredicate = untypedCurry( <A>( predicate: Predicate2<A, A>, list: A[] ): boolean => {
  for ( let i = 1; i <= list.length - 1; i++ ) {
    if ( !predicate( list[ i - 1 ], list[ i ] ) ) {
      return false
    }
  }
  return true
} )
/**
 * Applies a predicate over an array and returns true if all predicates are true;
 * if not it returns true.
 * @param predicate predicate function taking two sequential items from array
 * @param arr array to test
 * @sig ((a1,a2) -> bool) -> [a1,a2,a3...an] -> bool
 * @example
 * arrayItemsMeetPredicate( (current,previous) => current > previous , [1,2,3,4,2]) // false
 * arrayItemsMeetPredicate( (current,previous) => current > previous , [1,2,3,4]) //true
 */
export function arrayItemsMeetPredicate<A>( predicate: Predicate2<A, A>, arr: A[] ): boolean
export function arrayItemsMeetPredicate<A>( predicate: Predicate2<A, A> ): ( arr: A[] ) => boolean
export function arrayItemsMeetPredicate( ...args ) {
  return _arrayItemsMeetPredicate( ...args )
}

export default arrayItemsMeetPredicate
