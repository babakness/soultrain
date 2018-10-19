/** @module math.ts */

import { curry } from './function/curry'
import { untypedCurry } from './function/untypedCurry'
/**
 * Adds two numbers. Curried.
 *
 * @example
 * const increment = add( 1 )
 * increment( 1 ) // 2
 *
 * :: n1 -> n2 -> n3
 */
export function add( a: number, b: number ): number
export function add( a: number ): ( b: number ) => number
export function add( ...args ) {
  return untypedCurry( ( a: number, b: number ): number => a + b )( ...args )
}

/**
 * Decreases a number by a whole number
 *
 * @example
 * dec( 2 ) // 1
 *
 * :: n1 -> n2
 */
export const dec = add( -1 )

/**
 * Increases a number by a whole number
 *
 * @example
 * inc( 2 ) // 3
 *
 * :: n1 -> n2
 */
export const inc = add( 1 )

/**
 * Multiply two numbers. Curried.
 *
 * @example
 * const double = multiply( 2 )
 * double( 10 ) // 20
 *
 * :: n1 -> n2 -> n3
 */
export function multiply( a: number, b: number ): number
export function multiply( a: number ): ( b: number ) => number
export function multiply( ...args ) {
  return untypedCurry( ( a: number, b: number ) => a * b )( ...args )
}
