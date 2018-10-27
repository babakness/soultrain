/** @module type/type.ts */

import head from '../array/head'

/**
 * Returns the string value of the primative object given.
 * @param obj object to inspect primative type of
 * @sig a -> str
 * @example
 * type( 'test' )
 * // 'String'
 */
export const type = ( obj: any ): 'Set'| 'Map' | 'WeakMap' | 'Object' | 'Number' | 'Boolean' | 'String' | 'Null' | 'Array' | 'RegExp' | 'Function' | 'Undefined' => obj === null
  ? 'Null'
  : obj === undefined
    ? 'Undefined'
    // tslint:disable-next-line:ter-computed-property-spacing
    : head( Object.prototype.toString.call( obj ).match( /[A-Z][a-z]*/ ) )

export default type

// type P = 1 extends object ? true : false
