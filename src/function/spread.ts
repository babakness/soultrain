/** @module function/spread.ts */

/**
 * Spread array values as parameters to a given function
 * @param fn function to spread array as parameters over
 * @param arr array of values to spread over function fn
 * @sig fn -> arr -> fn(...arr)
 * @example
 * const joinArgs = ( a: string ) => ( ...args: string[] ) => args.join( a )
 * pipeline(
 *   'a-b-c',
 *   split('-'),
 *   spread(joinArgs('/'))
 * )
 * //=> 'a/b/c'
 */
export const spread = <P, R >( fn: ( ...args: [P, ...P[]] ) => R ) => ( arr: [P, ...P[]] ) => fn( ...arr )

const foo = spread( ( a: number, b: number ): number  => a + b )( [ 1 , 2 ] )

export default spread
