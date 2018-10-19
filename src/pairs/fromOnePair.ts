/** @module pairs/fromOnePair.ts */

import { curry } from '../function/curry'
/**
 * Takes a single key-value pair array and returns an object
 *
 * @param pair ( [ key , value ])
 * @sig ( [ k, v ] ) -> { k : v }
 * @example
 * fromOnePair( ['a','b' ] ) // [ {a: 'b'} ]
 */
export const fromOnePair = curry( ( [ key, value ] ): object => ( { [ key ]: value } ) )
