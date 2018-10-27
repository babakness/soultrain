/** @module pairs/fromSinglePair.ts */

import untypedCurry from '../function/untypedCurry'

/** @module pairs/fromOnePair.ts */

export function fromSinglePair<K extends string, V>( k: K, v: V ): {[Key in string]: V}
export function fromSinglePair<K extends string, V>( k: K, v: V ): {[Key in number]: V}
export function fromSinglePair<K extends number, V>( k: K ): ( v: V ) => {[Key in string]: V}
export function fromSinglePair<K extends number, V>( k: K ): ( v: V ) => {[Key in number]: V}
/**
 * Takes a single key-value pair array and returns an object
 *
 * @param pair ( [ key , value ])
 * @sig ( [ k, v ] ) -> { k : v }
 * @example
 * fromSinglePair( ['a','b' ] ) // [ {a: 'b'} ]
 */
export function fromSinglePair( ...args ) {
  return untypedCurry( ( key, value ) => ( {[ key ]: value} ) )( ...args )
}
