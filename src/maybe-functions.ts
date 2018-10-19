/** @module maybe-functions.ts */

import { head } from './array/head'
import { init } from './array/init'
import { last } from './array/last'
import { tail } from './array/tail'
import { isNullable, isNullyOrNaN } from './check'
import { untypedCurry } from './function/untypedCurry'
import { WidenType } from './helper-types'
import { Just, Maybe, nothing } from './maybe'
import { prop } from './object'

export const safeInit = <A>( as: A[] ): Maybe<A[]> => {
  return isNullable( as ) ? nothing : Maybe.from( init( as ) )
}

export const safeHead = <A>( as: A[] ): Maybe<A> => {
  return isNullable( as ) ? nothing : Maybe.from( head( as ) )
}

export const safeLast = <A>( as: A[] ): Maybe<WidenType<A>> => {
  return isNullable( as ) ? nothing : Maybe.from( last( as ) as WidenType<A> )
}

export const safeTail = <A>( xs: A[] ): Maybe< A[] > => {
  return isNullable( xs ) ? nothing : Maybe.from( tail( xs ) )
}

const _safeProp = untypedCurry( ( str, obj ) => {
  const result = prop( str )( obj )
  return isNullyOrNaN( result ) ? nothing : Just.of( result )
} )

type PossibleKeyValue<A, O> = A extends keyof O ? keyof O[A] : {}

/**
 * takes an key (or index) and an array or object and returns
 * a Maybe. A Just containing the value of that object at key
 * or a Nothing if there is no value at the key index.
 */
export function safeProp<O, A>( k: A, obj: O ): Maybe<PossibleKeyValue<A, O>>
export function safeProp<O, A>( k: A ): ( obj: O ) => Maybe<PossibleKeyValue<A, O>>
export function safeProp( ...args ) {
  return _safeProp( ...args )
}

/**
 * takes an index and an array and returns a maybe containing
 * the value at array's index (or nothing)
 * @example
 * safeIndex(2,[1,2,3]) // Just(3)
 * safeIndex(10,[1,2,3]) // nothing
 */
const _safeIndex = untypedCurry( ( index, arr ) => Maybe.from( arr[ index ] ) )
export function safeIndex<A, B extends keyof A>( index: B & number, arr: A & Array<{}> ): Maybe<A[B]>
export function safeIndex<A, B extends keyof A>( index: B | number ): ( arr: A ) => Maybe<A[B]>
export function safeIndex( ...args ) {
  return _safeIndex( ...args )
}
