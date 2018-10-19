/** @module iterables.ts */

import { joinArray } from './array/joinArray'
import { reverse } from './array/reverse'
import { toArray } from './array/toArray'
import { pipeline } from './function/pipeline'
import { untypedCurry } from './function/untypedCurry'
import { Predicate } from './helper-types'

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

/**
 * Takes a function f and an iterable i and returns an array with f mapped over i
 * :: ( f -> a -> b ) -> Iterable<a> -> b[]
 */
export function mapIterable<A, B>( fn: ( item: A ) => B, itr: Iterable<A> | NodeListOf<Node> ): B[]
export function mapIterable<A, B>( fn: ( item: A ) => B ): ( itr: Iterable<A> | NodeListOf<Node> ) => B[]
export function mapIterable( ...args ) {
  return _mapIterable( ...args )
}

type FilterIterable<A> = A extends Node
  ? ( itr: NodeListOf<A> ) => A[]
  : ( itr: Iterable<A> ) => A[]

export function filterIterable<A>( fn: Predicate<A>, itr: Iterable<A> ): A[]
export function filterIterable<A extends Node>( fn: Predicate<A>, itr: NodeListOf<A> ): A[]
export function filterIterable<A>( fn: Predicate<A> ): FilterIterable<A>
export function filterIterable<A extends Node>( fn: Predicate<A> ): FilterIterable<A>
export function filterIterable( ...arg ) {
  return untypedCurry(
    ( fn, itr ) => {
      const arr: any[] = []
      const index = 0
      for ( const i of itr ) {
        if ( fn( i ) === true ) {
          arr.push( i )
        }
      }
      return arr
    },
  )
}

type PredicateWithIndex<A> = ( item: A, index: number ) => boolean
export function filterIterableWithIndex<A>( fn: PredicateWithIndex<A>, itr: Iterable<A> ): A[]
export function filterIterableWithIndex<A extends Node>( fn: PredicateWithIndex<A>, itr: NodeListOf<A> ): A[]
export function filterIterableWithIndex<A>( fn: PredicateWithIndex<A> ): FilterIterable<A>
export function filterIterableWithIndex<A extends Node>( fn: PredicateWithIndex<A> ): FilterIterable<A>
export function filterIterableWithIndex( ...arg ) {
  return untypedCurry(
    ( fn, itr ) => {
      const arr: any[] = []
      let index = 0
      for ( const i of itr ) {
        if ( fn( i, index++ ) === true ) {
          arr.push( i )
        }
      }
      return arr
    },
  )
}

export const _mapIterableWithIndex = untypedCurry( ( fn, itr ) => {
  const arr: any[] = []
  let index = 0
  for ( const i of itr ) {
    arr.push( fn( i, index++ ) )
  }
  return arr
} )
/**
 * Takes a function f and an iterable i and returns an array with f mapped over i with index. Curried
 * :: ( f -> (a,i) -> b ) -> Iterable<a> -> b[]
 */
export function mapIterableWithIndex<A, B>( fn: ( item: A, index: number ) => B, itr: Iterable<A> ): B[]
export function mapIterableWithIndex<A, B>( fn: ( item: A, index: number ) => B ): ( itr: Iterable<A> ) => B[]
export function mapIterableWithIndex( ...args ) {
  return _mapIterableWithIndex( ...args )
}

/**
 * Takes any iterable and returns the reverse joined
 * :: Iter -> str
 */
export const toStringReverse = <A extends string>( iter: Iterable<A> ) =>  pipeline( iter, toArray, reverse, joinArray( '' ) )
