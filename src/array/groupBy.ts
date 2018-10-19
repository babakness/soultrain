import { untypedCurry } from '../function/untypedCurry'
import { Maybe } from '../maybe'
import { safeProp } from '../maybe-functions'
import { assign, fromSinglePair } from '../object'
const _appendToProp = <A>( item, key, acc ) => ( safeProp( key, acc ) as Maybe<A[]> )
  .map( ( groupXs: A[] ) => groupXs.concat( item ) )
  .joinOrValue( [ item ] )
// tslint:disable-next-line:variable-name
const _groupBy = untypedCurry( <A>( fn: ( A ) => string, list: A[] ) => {
  return list.reduce( ( acc, item: A ) => assign( acc, Maybe.of( fn( item ) )
    .map( ( key ) => fromSinglePair( key, _appendToProp( item, key, acc ) ) )
    .joinOrValue( {} ) ), {} )
} )
/**
 * Group items in an array `arr` per returned string values in function `fn`
 * @param fn function takes value T from array T[] returning a string
 * @param arr an array of T[]
 * @sig ( a -> str ) -> a[] -> { str1 : a1, str2: a2, ... }
 * @example
 * groupBy( x => x % 2 ? 'odd' : 'even', [1,2,3,4,5,6,7])
 * // { odd: [ 1, 3, 5, 7 ], even: [ 2, 4, 6 ] } : Record< 'odd' | 'even', number[]>
 */
export function groupBy<T, K extends string>( fn: ( a: T ) => K, arr: ReadonlyArray<T> ): Record<K, T[]>
export function groupBy<T, K extends string>( fn: ( a: T ) => K ): ( arr: ReadonlyArray<T> ) =>  Record<K, T[]>
export function groupBy( ...args ) {
  return _groupBy( ...args )
}

const fff = groupBy( ( x ) => x % 2 ? 'odd' : 'even', [ 1, 2, 3, 4, 5, 6, 7 ] )
