/** @module function/parallelObj.ts */

import head from '../array/head'
import last from '../array/last'
import { AnyFunction } from '../helper-types'
import { label, log } from '../logging'
import { assoc, prop } from '../object'
import type from '../type/type'
import untypedCurry from './untypedCurry'

type ParallelObjRecursive<O, Input> = {
  [K in keyof O] : O[K] extends ( ( a: Input ) => infer B )
    ? B
    : ParallelObjRecursive<O[K], Input>
    // : O[K] extends object
    //   ? ParallelObjRecursive<O[K], Input>
    //   : O[K] extends [any, ...any[]]
    //     ? O[K]
    //     : O[K]
}

const _parallelObjA = ( arr, input ) => arr.map( ( val ) => type( val ) !== 'Function'
  ? type( val ) === 'Object'
    ? _parallelObjO( val, input )
    : type( val ) === 'Array'
      ? _parallelObjA( val, input )
      : val
  : ( val as AnyFunction )( input ) ,
  )
// export declare function parallelObj<Input, B, O extends {[k in string]: any}>( obj: O , input: Input ): ParallelObjRecursive<O, Input>
const _parallelObjO =  ( obj, input ) => Object.entries( obj ).reduce( ( acc, [ key, val ] ) => type( val ) !== 'Function'
  ? type( val ) === 'Object'
    ? assoc( acc, key, _parallelObjO( val, input ) )
    : type( val ) === 'Array'
      ? assoc( acc, key, _parallelObjA( val, input ) )
      : assoc( acc, key, val )
  : assoc( acc, key, ( val as AnyFunction )( input ) ),
  {} )

// : shouldCopy( type( val ) )

export function parallelObj<Input, O extends [any, ...any[]] | {} >( obj: O , input: Input ): O extends [any, ...any[]]
  ? ParallelObjRecursive<O, Input>
  : ParallelObjRecursive<O, Input>
export function parallelObj<O extends object>( obj: O ): <Input>( input: Input ) => ParallelObjRecursive<O, Input>
export function parallelObj( ...args ) {
  return untypedCurry( ( obj, input ) => type( obj ) === 'Object'
    ? _parallelObjO( obj, input )
    : _parallelObjA( obj, input ) )( ...args )
}
