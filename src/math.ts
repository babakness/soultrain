import {curry} from './function'
/**
 * Adds two numbers. Curried.
 * 
 * @example
 * const increment = add( 1 )
 * increment( 1 ) // 2
 * 
 * :: n1 -> n2 -> n3
 */
export const add = curry(( a : number, b : number ) => a + b)


/**
 * Decreases a number by a whole number
 * 
 * @example
 * dec( 2 ) // 1
 * 
 * :: n1 -> n2
 */
 export const dec = add(-1)


 /**
 * Increases a number by a whole number
 * 
 * @example
 * inc( 2 ) // 3
 * 
 * :: n1 -> n2
 */
export const inc = add(1)


/**
 * Multiply two numbers. Curried.
 * 
 * @example
 * const double = multiply( 2 )
 * double( 10 ) // 20
 * 
 * :: n1 -> n2 -> n3
 */
export const multiply = curry(( a : number, b : number ) => a * b)
