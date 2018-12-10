/** @module object.ts */

import { curry } from './function/curry'
import { untypedCurry } from './function/untypedCurry'
import { KeyTypes, Unpacked, ValueOf} from './helper-types'
/**
 * Extract new object from an obj given an array of keys
 *
 * @example
 * pluckObj( 'a', 'c' )( { a: 1, b: 2, c: 3}) // { a: 1, c: 3 }
 *
 * :: ( k1, k2,...k3 ) -> o -> { k1: o[ k1 ], k2: o[ k2 ], ... k3: o[ k3 ] }
 */
export const pluckObj = ( ...itemsToPluck: string[] ) => ( obj: {} ) =>
  Object.keys( obj )
    .filter( ( i ) => itemsToPluck.indexOf( i ) > -1 )
    .reduce( ( acc, item ) => assoc_( item )( obj[ item ] )( acc ), {} )

/**
 * prop
 */

/**
 * Retrieves an object values given its property (key)
 *
 * @example
 * prop( 'a', { a : 1 } ) // 1
 *
 * :: k -> o -> o[ k ]
 */

export function prop<O, K extends keyof O, V>( prop: K, obj: O ): O[K]
export function prop<K extends string>( prop: K ): <V>( obj: { [k in K]: V }  & {[k: string]: any} ) => V
export function prop( ...args ) {
  return  untypedCurry( ( _prop, obj ) => obj[ _prop ] )( ...args )
}

/**
 * Retrieves an object values given its property name (key). Curried, not too strongly typed.
 *
 * @example
 * shallowProp( 'a' , { a: 1 , b: 2} ) // 1
 *
 * :: k -> o -> o[ k ]
 */
export const shallowProp = curry( ( _prop: string, obj: object ): string | number | symbol | boolean => obj[ _prop ] )

/**
 * Flipped version of `prop`. Retrieves an objects values given its property name (key). Curried
 *
 * @example
 * flippedProp( { a: 1}, 'a' ) // 1
 *
 * :: o -> k -> o[ k ]
 */
export const flippedProp = <T, K extends keyof T>( obj: T ) => ( _prop: K ) => obj[ _prop ]

export function assoc_ <P extends string|number|symbol, V, O>( prop: P, value: V, obj: O ): {[p in P]: V} & O
export function assoc_ <P extends string|number|symbol, V>( prop: P, value: V ): <O>( obj: O ) =>    {[p in P]: V} & O
export function assoc_ <P extends string|number|symbol>( prop: P ): <V>( value: V ) => <O>( obj: O ) =>  {[p in P]: V} & O
/**
 * Extends object with key/value pair. Curried
 *
 * @example
 * assoc( 'b', 2, { a: 1 } ) // { a: 1, b: 2 }
 *
 * :: k -> v -> o -> {...o, {[k]: v}} }
 */
export function assoc_( ...args ) {
  return untypedCurry(
    ( _prop, value, obj ) => Object.assign( {}, obj, {[ _prop ]: value} ),
  )( ...args )
}

export function assoc <O extends object, P extends string|number|symbol, V>( obj: O, prop: P, value: V ): {[p in P]: V} & O
export function assoc <O extends object, P extends string|number|symbol>( obj: O, prop: P ): <V>( value: V ) =>    {[p in P]: V} & O
export function assoc <O extends object>( obj: O ): <P extends string|number|symbol>( prop: P ) => <V>( value: V ) =>  {[p in P]: V} & O
/**
 * Extends object with key/value pair. Curried
 *
 * @example
 * assoc( 'b', 2, { a: 1 } ) // { a: 1, b: 2 }
 *
 * :: k -> v -> o -> {...o, {[k]: v}} }
 */
export function assoc( ...args ) {
  return untypedCurry(
    ( obj, _prop, value ) => Object.assign( {}, obj, {[ _prop ]: value} ),
  )( ...args )
}

export function assign<T, S>( target: T, source: S ): S & T
export function assign<T>( target: T ): <S>( source: S ) => S & T
/**
 * Extends a target object with a source
 *
 * @example
 * assign( { a: 2, b: 2 }, { a: 1 } ) // { a: 1, b: 2 }
 *
 * :: o1-> o2 -> {...o1, ...o2 }
 */
export function assign( ...args ) {
  return untypedCurry( ( target, source ) => Object.assign( {}, target, source ) )( ...args )
}

interface KeyValuePair<K, V> extends Array<K | V> {
  0: K
  1: V
}

// export const fromEntries = fromPairs
  // tslint:disable-next-line:no-shadowed-variable only-arrow-functions
export const _pathValue = untypedCurry( ( path: string[], obj: {} ) => path.reduce( ( acc, item ) => acc.hasOwnProperty( item ) ? acc[ item ] : undefined, obj ) )

// getPathValue(['a'],{a:1})

// export function getPathValue<L>(path: keyof L, obj: L): L[keyof L]
export function getPathValue<L, K1 extends keyof L>( path: [K1], obj: L ): Unpacked<[K1] > extends K1 ? L[K1] : unknown
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1]>( path: [K1, K2] , obj: L ): L[K1][K2]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2]>( path: [K1, K2, K3] , obj: L ): L[K1][K2][K3]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3]>( path: [K1, K2, K3, K4] , obj: L ): L[K1][K2][K3][K4]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4]>( path: [K1, K2, K3, K4, K5] , obj: L ): L[K1][K2][K3][K4][K5]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5]>( path: [K1, K2, K3, K4, K5, K6], obj: L ): L[K1][K2][K3][K4][K5][K6]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6]>( path: [K1, K2, K3, K4, K5, K6, K7] , obj: L ): L[K1][K2][K3][K4][K5][K6][K7]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7]>( path: [K1, K2, K3, K4, K5, K6, K7, K8] , obj: L ): L[K1][K2][K3][K4][K5][K6][K7][K8]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9], obj: L ): L[K1][K2][K3][K4][K5][K6][K7][K8][K9]
export function getPathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10] , obj: L ): L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]
// export function getPathValue<L>(path: KeyTypes[], obj: L): unknown
// export function pathValue<L, K1 extends keyof L>(path: [K1]): ( obj: L) => L[K1]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1]>(path:  [K1,K2] ): ( obj: L) => L[K1][K2]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2]>( path: [K1, K2, K3] ): ( obj: L) => L[K1][K2][K3]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3]>( path:  [K1, K2, K3, K4] ): ( obj: L) => L[K1][K2][K3][K4]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4]>(  path:  [K1, K2, K3, K4, K5] ): ( obj: L) => L[K1][K2][K3][K4][K5]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5]>( path:  [K1, K2, K3, K4, K5, K6]): ( obj: L) => L[K1][K2][K3][K4][K5][K6]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6]>(  path:  [K1, K2, K3, K4, K5, K6, K7] ): ( obj: L) => L[K1][K2][K3][K4][K5][K6][K7]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7]>( path: [K1, K2, K3, K4, K5, K6, K7, K8] ): ( obj: L) => L[K1][K2][K3][K4][K5][K6][K7][K8]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9]): ( obj: L) => L[K1][K2][K3][K4][K5][K6][K7][K8][K9]
// export function pathValue<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10] ): ( obj: L) => L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]
// export function getPathValue<KS extends GeneralObjectPath, L>(path: KS, obj: L): unknown
/**
 * Todo
 */

/**
 * Takes an array of paths to lookup and a look up object, returns value at path or null.
 *
 * @example
 * path( ['a', 'b', 'c' ])( {a: { b: {c : 1 } } } ) // 1
 *
 * :: ( k1, k2, ... k3 ) -> o -> o[ k1 ][ k2 ][ k3 ]
 */
export function getPathValue( ...args ) {
  return _pathValue( ...args )
}

export const path = getPathValue

/**
 * Retrieves the value of an obj item at given index or key
 * @param obj array to get item
 * @example
 * valueAt(2,[1,2,3]) // 3
 */
export const valueAt = <G, K extends keyof G>( obj: G, k: K ): G[K] => obj[ k ]

/**
 * Todo
 */
export const keys = <V>( obj: { [k: string]: V } ): string[] => Object.keys( obj )

/**
 * Todo
 */
// export const values = <V extends unknown>( obj: { [k: string]: V } ): V[] => Object.values ? Object.values( obj ) : Object.keys( obj ).map( ( key ) => obj[ key ] )
export const values = <O>( obj: O ): Array<O[ keyof O ]> => Object.values
  ? Object.values( obj ) as Array<O[ keyof O ]>
  : Object.keys( obj ).map( ( key ) => obj[ key ] ) as Array<O[ keyof O ]>
