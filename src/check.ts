/** @module check.ts */

import { complement } from './function/complement'
/**
 * Takes value and returns boolean with true signifying type is null, undefined, or NaN.
 * :: a -> bool
 */
export const isNullyOrNaN = ( a ) => a === undefined || a === null || ( typeof a === 'number' && isNaN( a ) )
export const isNullable = ( a ): a is ( undefined | null ) => a === undefined || a === null
export const isNanOrInfinity = ( a ) => ( typeof a === 'number' && isNaN( a ) ) || a === Infinity || a === -Infinity

export const isNumber = ( a ): a is number => typeof a === 'number'
export const isObject = ( a ): a is object => typeof a === 'object'
export const isFunction = ( a ): a is ( ( ...a: any[] ) => any ) => typeof a === 'function'
export const isArray = ( a ): a is Array<unknown> => Array.isArray( a )

/**
 * Takes value and returns boolean with true signifying type is not null, undefined, or NaN.
 * :: a -> bool
 */
export const isNotNully = complement( isNullyOrNaN ) as ( a: any ) => boolean
