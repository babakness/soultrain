/** @module type/type.ts */

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
    : Object.prototype.toString.call( obj )

export default type

type P = 1 extends object ? true : false
