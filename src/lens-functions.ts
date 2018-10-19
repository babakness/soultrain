/** @module lens-functions.ts */
import { last } from './array/last'
import { pipeline } from './function/pipeline'
import { untypedCurry } from './function/untypedCurry'
import { dec } from './math'
const doDeepCopyOnBranch = ( node ) => node instanceof Object
  && !( node instanceof Date )
  && !( node instanceof String )
  && !( node instanceof Function )
const mapObject = ( fn, obj ): any[] => {
  const arr: any[] = []
  for ( const prop in obj ) {
    if ( obj.hasOwnProperty( prop ) ) {
      arr.push( fn( prop, obj[ prop ], obj ) )
    }
  }
  return arr
}

export const DELETE: unique symbol = Symbol()
export const UNCHANGED: unique symbol = Symbol()
// tslint:disable-next-line:no-console
const traceType = ( a ) => ( console.log( typeof a, a ), a )
const shouldUpdate = ( level, key, path ) => level === dec( path.length ) && key === String( last( path ) )
const dangerouslyMutateObjValue = ( key, value, obj ) => ( obj[ key ] = value, obj )
// tslint:disable-next-line:variable-name
export const _lens = ( path: any[], fn, defaultValue, source, level = 0 ) => mapObject( ( key, node ) => ( !doDeepCopyOnBranch( node ) ) // || path.indexOf(key) !== level)
  // don't deep copy if not object, array, or in path
  ? [ key, node ]
  // deep copy, not particularly optimized recurssion
  : String( path[ level ] ) !== String( key )
    ? [ key, node ]
    : [ key, _lens( path, fn, defaultValue, node, level + 1 ) ],
  source,
).reduce( ( acc, [ key, value ], index ) => !shouldUpdate( level, key, path )
    // if not the last value in the lens path, mutated accumletator
    ? dangerouslyMutateObjValue( key, value, acc )
    // otherwise, computed the new value and only mutated accumelator with the value
    // if the request to delete the node by returning the DELETE type isn't sent.
    : pipeline(
      value == null
        ? typeof defaultValue === 'undefined'
          ? value
          : defaultValue === UNCHANGED
            ? value
            : defaultValue
        : fn( value ),
      ( computedValue ) => computedValue === DELETE
        ? acc
        : dangerouslyMutateObjValue( key, computedValue, acc ) ), source instanceof Array ? [] : {} )

export function lens<L, K1 extends keyof L, D extends L[K1], A>( path: [K1], fn: ( pathData: D ) => A, defaultValue: A, source: L ): L
export function lens<L, K1 extends keyof L, K2 extends keyof L[K1], D extends L[K1][K2], A>( path: [K1, K2], fn: ( pathData: D ) => A, defaultValue: A, source: L ): L
export function lens<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], D extends L[K1][K2][K3], A>( path: [K1, K2, K3], fn: ( pathData: D ) => A, defaultValue: A, source: L ): L
export function lens<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], D extends L[K1][K2][K3][K4], A>( path: [K1, K2, K3, K4], fn: ( pathData: D ) => A, defaultValue: A, source: L ): L
export function lens<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], D extends L[K1][K2][K3][K4][K5], A>( path: [K1, K2, K3, K4, K5], fn: ( pathData: D ) => A, defaultValue: A, source: L ): L
export function lens<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], D extends L[K1][K2][K3][K4][K5][K6], A>( path: [K1, K2, K3, K4, K5, K6], fn: ( pathData: D ) => A, defaultValue: A, source: L ): L
export function lens<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], D extends L[K1][K2][K3][K4][K5][K6][K7], A>( path: [K1, K2, K3, K4, K5, K6, K7], fn: ( pathData: D ) => A, defaultValue: A, source: L ): L
export function lens<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], D extends L[K1][K2][K3][K4][K5][K6][K7][K8], A>( path: [K1, K2, K3, K4, K5, K6, K7, K8], fn: ( pathData: D ) => A, defaultValue: A, source: L ): L
export function lens<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], D extends L[K1][K2][K3][K4][K5][K6][K7][K8][K9], A>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9], fn: ( pathData: D ) => A, defaultValue: A, source: L ): L
export function lens<L, K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9], D extends L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10], A>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10], fn: ( pathData: D ) => A, defaultValue: A, source: L ): L
export function lens<P, PK extends keyof P, D, A, L>( path: P[], fn: ( pathData: D ) => A, defaultValue: A ): ( source: L ) => L
export function lens<P, PK extends keyof P, D, A, L>( path: P[], fn: ( pathData: D ) => A ): ( defaultValue: A ) => ( source: L ) => L
export function lens<P, PK extends keyof P, D, A, L>( path: P[] ): <B extends A>( fn: ( pathData: D ) => B ) => ( defaultValue: B ) => ( source: L ) => L
export function lens( ...args ) {
  return untypedCurry( ( path, fn, defaultValue, source ) => _lens( path, fn, defaultValue, source ) )( ...args )
}
