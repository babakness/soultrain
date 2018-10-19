/** @module function/always.ts */

import { untypedCurry } from './untypedCurry'

/**
 * Returns the first value, ignores second. This is the Constant / Kestrel
 * combinator
 *
 * @param returned object/value returned
 * @param ignored object/value ignored
 * @sig a -> b -> a
 * @example
 *
 * const constant5 = always(5)
 * constant5() === 5 // true
 */
export function always<A>( returned: A , ignored: any ): A
export function always<A>( returned: A ): ( ignored: any ) => A
export function always( ...args ) {
  return untypedCurry( ( returned, ignore ) => returned )( ...args )
}
export default always
