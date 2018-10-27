/** @module iterable/mapIterable.ts */

import { untypedCurry } from '../function/untypedCurry'
/**
 * mapIterable
 */
export const _mapIterable = untypedCurry( ( fn, itr ) => {
  const arr: any[] = []
  for ( const i of itr ) {
    arr.push( fn( i ) )
  }
  return arr
} )
export function mapIterable<A, B>( fn: ( item: A ) => B, itr: Iterable<A> | NodeListOf<Node> ): B[]
export function mapIterable<A, B>( fn: ( item: A ) => B ): ( itr: Iterable<A> | NodeListOf<Node> ) => B[]
/**
 * Takes a function f and an iterable i and returns an array with f mapped over i
 * :: ( f -> a -> b ) -> Iterable<a> -> b[]
 */
export function mapIterable( ...args ) {
  return _mapIterable( ...args )
}
