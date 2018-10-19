/** @module function/not.ts */
import { Complement } from '../helper-types'

/**
 * Evaluates a value as a "truthy" and returns the opposing boolean value
 *
 * @param value
 * @sig a -> bool
 * @example
 * not('abc') //=> false
 * not(true) // => false
 * not(0) // => true
 */
export const not = <A extends boolean>( value: A ): Complement<A> => !value as Complement<A>

export default not
