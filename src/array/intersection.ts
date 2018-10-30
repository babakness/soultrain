/** @module array/intersection.ts */

import { complement, pipe, untypedCurry } from '../function'
import { filter } from '../functor-helpers'
import { FlattenOnce} from '../helper-types'
import { contains } from './contains'
import unique from './unique'

const uniqueContains = pipe( unique, contains )

export function intersection<A extends any[], B extends any[]>( first: A, second: B ): Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function intersection<A extends any[]>( first: A ): <B extends any[]>( second: B ) => Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function intersection<A extends any[]>( first: A ): <B extends any[]>( second: B ) => Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
/**
 * Get an set representing the common items between two lists.
 * Matches on value equality or referencial equality.
 * @param first first array to intersect
 * @param second second array to intersect
 * @sig a[] -> b[] -> (a|b)[]
 * @example
 * intersection([1,2,3,4], [3,4,5,6]); //=> [3, 4]
 * intersection([{a:1},{b:2}], [{a:2}, {b:2}]) // => [{b:2}]
 */
export function intersection( ...args ) {
  return untypedCurry(
      ( first, second ) => filter(
        uniqueContains( first ) ,
        unique( second ),
      ),
    )( ...args )
}
export function difference<A extends any[], B extends any[]>( first: A, second: B ): Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function difference<A extends any[]>( first: A ): <B extends any[]>( second: B ) => Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function difference<A extends any[]>( first: A ): <B extends any[]>( second: B ) => Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
/**
 * Get a set of all items in the first list not contained in the second list.
 * Matches on value equality or referencial equality.
 * @param first first array to intersect
 * @param second second array to intersect
 * @sig a[] -> b[] -> a[]
 * @example
 * difference([1,2,3,4], [3,4,5,6]); //=> [1, 2]
 * difference([{a:1},{b:2}], [{a:2}, {b:2}]) // => [{a:1}]
 */
export function difference( ...args ) {
  return untypedCurry(
      ( first, second ) => filter(
        complement( uniqueContains( second ) ) ,
        unique( first ),
      ),
    )( ...args )
}

export function symmetricDifference< A extends any[], B extends any[]>( first: A, second: B ): Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function symmetricDifference< A extends any[]>( first: A ): <B extends any[]>( second: B ) => Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function symmetricDifference< A extends any[]>( first: A ): <B extends any[]>( second: B ) => Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
/**
 * Get a set of all items in not common in both lists.
 * Matches on value equality or referencial equality.
 * @param first first array to intersect
 * @param second second array to intersect
 * @sig a[] -> b[] -> a[]
 * @example
 * symmetricDifference([1,2,3,4], [3,4,5,6]); //=> [1, 2, 5, 6]
 * intersection([{a:1},{b:2}], [{a:2}, {b:2}]) // => [{a:1},{a:2}]
 */
export function symmetricDifference( ...args ) {
  return untypedCurry(
    ( first, second ) => difference( first, second ).concat( difference( second, first ) ),
  )( ...args )
}
