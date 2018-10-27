/** @module iterable/mapIterableWithIndex.ts */

import { untypedCurry } from '../function/untypedCurry'
export const _mapIterableWithIndex = untypedCurry( ( fn, itr ) => {
  const arr: any[] = []
  let index = 0
  for ( const i of itr ) {
    arr.push( fn( i, index++ ) )
  }
  return arr
} )
export function mapIterableWithIndex<A, B>( fn: ( item: A, index: number ) => B, itr: Iterable<A> ): B[]
export function mapIterableWithIndex<A, B>( fn: ( item: A, index: number ) => B ): ( itr: Iterable<A> ) => B[]
/**
 * Takes a function f and an iterable i and returns an array with f mapped over i with index. Curried
 * @param fn function taking the current item and index
 * @param itr iterable of items
 * @sig ( f -> (a,i) -> b ) -> Iterable<a> -> b[]
 * @example
 * mapIterableWithIndex( (str,index) => index % 2 === 0 ? str.slice().reverse() : str , ['hello','how','are','you])
 * //=> ['olleh','how','era','you])
 */
export function mapIterableWithIndex( ...args ) {
  return _mapIterableWithIndex( ...args )
}
