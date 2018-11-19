import {
  AnyFunction,
  Concat,
  ExtractFunctionArguments,
  ExtractFunctionReturnValue,
  IsAny,
  Prepend,
  Reverse,
} from '../helper-types'

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
// const asfa = pipe(
//   ( a: number, b: number ): number => a + 1 ,
//   ( x: number ): string => `${x}`,
//   ( x: string ): string => String( x ),
//   ( x: string ): string => x , ( b: string ) => 'sf', ( b: string ) => 'sf' )

type SubtractList<A extends any[], B extends any[]> = {
  // @ts-ignore
  'reduce':
    ( ( ..._: A ) => any ) extends ( ( _: infer A1, ..._1: infer AR ) => any )
      ? ( ( ..._: B ) => any ) extends ( ( _: infer B1, ..._1: infer BR ) => any )
        ?  B1 extends A1
          ? SubtractList<AR, BR>
          : A1
        : 'ERROR B'
      : 'ERROR C',
  'done': A,
  'end': [],
}[
  B extends []
    ? 'done'
    : A extends []
      ? 'end'
      : 'reduce'
]

type asdf4  = SubtractList<[1, 2, 3], [1, 2]>

type Partial<F, Args> = Args extends any[]
  ?
    F extends ( ( ...args: infer FA ) => infer Return )
      ? FA extends []
        ? Args extends []
          ? F
          : Return
        : SubtractList<FA, Args> extends []
          ? ExtractFunctionReturnValue<F> // maybe error?
          : ( ...args: SubtractList<FA, Args> ) => ExtractFunctionReturnValue<F>
      : 'P ERROR'
  : 'no'

type pof = Partial< ( a: number, b: string ) => string[], [number]>

type NotRequired<T> = {[K in keyof T]?: T[K] }

type Curry<F, A> = {
  'a':
    A extends any[]
      ? Partial<F, A> extends ( ( _: infer First, ..._1: infer Rest ) => infer Return )
        ? <B extends NotRequired<Rest>>( a: First, ...args: B ) => Curry<F, Concat< A, Prepend<B, First>>>
        : 'never'
      : never
  'b': Partial < F, A >,
  'c': Partial < F, A >,
}[
  A extends any[]
    ? Partial < F, A > extends AnyFunction
      ? 'a'
      : 'c'
    : never
]

declare function partial<F, Args extends any[]>( f: F, ...args: Args ): Partial<F, Args>
declare function curry<F, Args extends any[]>( f: F, ...args: Args ): Curry<F, Args>

// const foo = curry( ( a: number, b: number, c: number, d: string ) => 'asdf' , 4 )( 2 )( 2, 'f' )// ( 1 )( 4 )( 'f ' )
