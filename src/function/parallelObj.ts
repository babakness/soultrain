/** @module function/parallelObj.ts */

import head from '../array/head'
import last from '../array/last'
import { AnyFunction, BasicTypes, Contains, ContainsType, Equals, ExtractFunctionArguments, ExtractFunctionReturnValue, Function1, FunctionProperties, IsAny, IsArray, Prepend, Reverse, ValueOf } from '../helper-types'
import { label, log } from '../logging'
import { assoc } from '../object'
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

export function parallelObj<Input, B, O extends [any, ...any[]] | {} >( obj: O , input: Input ): O extends [any, ...any[]]
  ? ParallelObjRecursive<O, Input>
  : ParallelObjRecursive<O, Input>
export function parallelObj<B, O extends object>( obj: O ): <Input>( input: Input ) => ParallelObjRecursive<O, Input>
export function parallelObj( ...args ) {
  return untypedCurry( ( obj, input ) => type( obj ) === 'Object'
    ? _parallelObjO( obj, input )
    : _parallelObjA( obj, input ) )( ...args )
}

// // const ff4 = parallel( ( x: number ) => x + 3, () => 'f' ) ( 4 )
// const fff = head( tryThis )

type BooleanSwitch<Test, T = true, F = false> = Test extends true ? T : F

type Pipe<Fns extends any[], IsPipe = true, PreviousFunction = void, InitalParams extends any[] = any[] , ReturnType = any> = {
  'next': ( ( ..._: Fns ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
    ? PreviousFunction extends void
        ? Pipe<Next, IsPipe, First, ExtractFunctionArguments<First>, ExtractFunctionReturnValue<First> >
        : ReturnType extends ExtractFunctionArguments<First>[0]
          ? Pipe<Next, IsPipe, First, InitalParams, ExtractFunctionReturnValue<First> >
          : IsAny<ReturnType> extends true
            ? Pipe<Next, IsPipe, First, InitalParams, ExtractFunctionReturnValue<First> >
            : {
              ERROR: ['Return type ', ReturnType , 'does comply with the input of', ExtractFunctionArguments<First>[0]],
              POSITION: ['Position of problem for input arguments is at', Fns['length'], 'from the', BooleanSwitch<IsPipe, 'end', 'beginning'> , 'and the output of function to the ', BooleanSwitch<IsPipe, 'left', 'right'>],
            }
    : never
  'done': ( ...args: InitalParams ) => ReturnType,
}[
  Fns extends []
    ? 'done'
    : 'next'
]

type Compose<Fns extends any[]> = Pipe<Reverse<Fns>, false>

declare function pipe <Fns extends [AnyFunction, ...AnyFunction[]] >( ...fns: Fns ): Pipe<Fns>
declare function compose <Fns extends [AnyFunction, ...AnyFunction[]] >( ...fns: Fns ): Compose<Fns>
// const fffff =  ( a: number, b: number ) => a + 1
// const asf = pipe( ( a: number, b: number ): number => a + 1 , ( x ) => x, ( x ) => x, ( x ): string => x , ( b: number ) => 'sf', ( b: string ) => 'sf' )
// const asfa = compose(
//   ( a: number, b: number ): number => a + 1 ,
//   ( x ) => x,
//   ( x: string ): string => String( x ),
//   ( x: string ): string => x , ( b: string ) => 'sf', ( b: string ) => 'sf' )

// type foo = Exclude<  string, string>
