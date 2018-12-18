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
export function spread <P, R>( fn: ( args: [P, ...P[]] ) => R ): ( arr: [P, ...P[]] ) => R
export function spread <F extends ( ...args: any[] ) => any>( fn: F ): <A extends any[]>( arr: A ) => F extends ( ...args: any[] ) => infer U ? U : never
// @ts-ignore
export function spread( fn ) {
  // @ts-ignore
  // tslint:disable-next-line:only-arrow-functions
  return function( arr ) {
    return fn( ... arr )
  }
}
export default spread
