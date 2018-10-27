/** @module check.ts */

import { complement } from './function/complement'
/**
 * Takes value and returns boolean with true signifying type is null, undefined, or NaN.
 * :: a -> bool
 */
export const isNullyOrNaN = ( a ) => a === undefined || a === null || ( typeof a === 'number' && isNaN( a ) )
/**
 * Todo
 */
export const isNullable = ( a ): a is ( undefined | null ) => a === undefined || a === null
/**
 * Todo
 */
export const isNanOrInfinity = ( a ) => ( typeof a === 'number' && isNaN( a ) ) || a === Infinity || a === -Infinity

/**
 * Todo
 */
export const isNumber = ( a ): a is number => typeof a === 'number'
/**
 * Todo
 */
export const isObject = ( a ): a is object => typeof a === 'object'
/**
 * Todo
 */
export const isFunction = ( a ): a is ( ( ...a: any[] ) => any ) => typeof a === 'function'
/**
 * Todo
 */
export const isArray = ( a ): a is Array<unknown> => Array.isArray( a )

/**
 * Takes value and returns boolean with true signifying type is not null, undefined, or NaN.
 * :: a -> bool
 */
export const isNotNully = complement( isNullyOrNaN ) as ( a: any ) => boolean
