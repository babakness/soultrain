/** @module function/evolve.ts */

import { AnyObject } from '../helper-types'
import { assoc } from '../object'
import { Evolve } from '../type/evolve-type'
import { type } from '../type/type'
import { untypedCurry } from './untypedCurry'

const _evolve = ( fno: {}, dao: {} ) =>  Object.entries( dao ).reduce( ( acc, [ key, val ] ) => type( fno[ key ] ) !== 'Function'
  ? type( fno[ key ] ) === 'Object' && type( val ) === 'Object'
    ? assoc( acc, key, _evolve( fno[ key ], val ) )
    : assoc( acc, key, val )
  : assoc( acc, key, fno[ key ]( val ) )
  ,
  {} )

/**
 * Produces a new object from the result of applying function from an
 * object tree with functions which take corresponding values from an
 * incoming object
 * @param evolver
 * @param incoming
 */
export function evolve<E extends AnyObject, I extends AnyObject>( evolver: E, incoming: I ): Evolve<E, I>
export function evolve<E extends AnyObject>( evolver: E ): <I extends AnyObject>( incoming: I ) => Evolve<E, I>
export function evolve( ...args ) {
  return untypedCurry( _evolve )( ...args )
}
