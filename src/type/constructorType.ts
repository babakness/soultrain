/** @module type/constructorType.ts */

import {type} from './type'

/**
 * Returns the string constructor value of the primative object given.
 * Will return 'Anonymous' for an anonmous class constructor
 * @param obj object to determine constructor of
 * @sig a -> str
 * @example
 * constructorType( new class Foo{} )
 * //=> 'Foo
 * constructorType( 100 )
 * //=> 'Number'
 * constructorType( new class{})
 * //=> 'Anonymous'
 */
export const constructorType = ( x ) => {
  const classRegEx = x.constructor
    ? String( x.constructor.toString() ).match( /class[ ]*([^\{]*)/i )
    : null
  return typeof classRegEx === 'string'
      ? classRegEx[ 1 ]
        ? classRegEx[ 1 ]
        : 'Anonymous'
      : type( x )
}
