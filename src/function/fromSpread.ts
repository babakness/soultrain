/** @module function/spread.ts */

/**
 * Spread array values as parameters to a given function
 * @param fn function to spread array as parameters over
 * @param args arguemnts of values to inject as array into function fn
 * @sig fn -> arr -> fn(...arr)
 * @example
 * const joinClasses = fromSpread( joinArray(' ' ) )
 * //=> 'a/b/c'
 */
export const fromSpread = <F extends ( ...args: any[] ) => any>( fn: F ) => <A extends any[]>( ...args: A ): ( F extends  ( arr: any[] ) => infer U ? U : never ) => fn( args )
