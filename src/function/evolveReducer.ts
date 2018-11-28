/** @module function/evolve.ts */

import { AnyObject, DeepPartial, DeepPartialFlexibleType } from '../helper-types'
// import { trace } from '../logging'
import { assoc, path } from '../object'
import { Evolve } from '../type/evolve-type'
import { type } from '../type/type'
import { untypedCurry } from './untypedCurry'

const _evolveReducer = ( fno: {}, prev: {}, dao: {}, keyList: string[] ) =>  Object.entries( dao ).reduce( ( acc, [ key, val ] ) => type( fno[ key ] ) !== 'Function'
  ? type( fno[ key ] ) === 'Object' && type( val ) === 'Object'
    ? assoc( acc, key, _evolveReducer( fno[ key ], prev, val, keyList.concat( key ) ) )
    : assoc( acc, key, val )
  : assoc( acc, key, fno[ key ]( val, path( keyList.concat( key ) as any, prev ) ) )
  ,
  {} )

const _evolveReducer2 = ( fno: {}, prev: {}, dao: {} ) => ( {...prev, ..._evolveReducer( fno, prev, dao, [] )} )

/*
The way redux works is you give a reducer and initial state.
Dispatch trigger some type with some qualifier. The reducer
is given the last resolved total state and the dispatched action.

Evolve has some functions. It will be given the last computed state
(or inital state) and the current
*/

interface EvolveReducerSecondParameterCurried<E> {
  <P extends AnyObject, I extends Partial<P>>( previousState: P, incoming: I ): Evolve<E, I>
  <P extends AnyObject, I extends Partial<P>>( previousState: P ): ( incoming: I ) =>  Evolve<E, I>
}

/**
 * Produces a new object from the result of applying function from an
 * object tree with functions which take corresponding values from an
 * incoming object
 * @param evolver
 * @param incoming
 */
export function evolveReducer<P, E extends AnyObject = AnyObject, I extends DeepPartial<P> = DeepPartial<P>>( evolver: E, previousState: P, incoming: I ): P
// export function evolveReducer<E extends AnyObject>( evolver: E ): EvolveReducerSecondParameterCurried<E>
export function evolveReducer( ...args ) {
  return untypedCurry( _evolveReducer2 )( ...args )
}

// evolveReducer( {
//   x: {
//     y: ( x: number, y: number ) => 400,
//   },
// },  { w: 100,  x: { y: 10 } }, {p: 4, w: '30' } )

// interface Foo {
//   a: {
//     b: number,
//   },
//   c: number
// }

// declare function foo<O, P extends { [K in keyof P]: K extends keyof O ? O[K] : never }>(
//   obj: O,
//   part: P,
// ): P

// const sdf = foo( {a: 1}, {b: 2} )
// type Bro = DeepPartial<Foo>

// declare function TT<I extends object>( p: I, foo: Partial<I> ): boolean

// TT( {h: 4}, { h: 3, a: { b: 4} } )

// declare function foo<O, P extends DeepPartial<O>>( obj: O, part: P ): P

// foo( { a: { b: 3 }}, { p: 44, a: { b: 3}} )

type StrictPartial<O, P> = { [K in keyof P]: K extends keyof O ? O[K] : never }

export type StrictDeepPartial<O, P> = {
  [K in keyof P]:
    K extends keyof O
      ? O[K] extends Array<infer U>
        ? never // Array<StrictDeepPartial<U, P[K]>>
        : O[K] extends ReadonlyArray<infer UU>
          ? ReadonlyArray<StrictDeepPartial<UU, P[K]>>
          : P[K]
      : never
  }

// When you resume this, check out this gist
// https://gist.github.com/babakness/a1ca775f81097ffae04098a8cfdadc60

// declare function foo2<O, P extends StrictDeepPartial<O, P>>(
//   obj: O,
//   part: P,
// ): P
// const bro  = foo2( { a: { b: 3 }}, { a: { b: '3'}} )
