/** @module function/untypedCurry.ts */

import { AnyFunction } from '../helper-types'

/**
 * Curries a function. Untyped parameters, easily adapts to various situations, best coupled with typed signature
 *
 * @example
 * untypedCurry( (a: any, cb: Function) => cb(a) )
 *
 * :: ( fn( a, b, ... c) -> x ) -> fn -> a -> b -> c -> x
 */
export function untypedCurry( fn: AnyFunction, ...args ) {
  return args.length >= fn.length ? fn( ...args ) : untypedCurry.bind( null, fn, ...args )
}

export default untypedCurry
