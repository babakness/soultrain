/** @module evolve-type.ts */

import { AnyFunction, AnyObject, ContainsAny, ContainsType, ExtractFunctionArguments, ExtractFunctionReturnValue, IsAny, KeySubset } from './helper-types'
type EvolvingValueNotAFunction<T> = T // 'THE VALUE ON THE LEFT HAND SIDE NEEDS TO BE A FUNCTION, OBJECT, OR ARRAY'
type BadEvolve<T> = 'ERROR: Evolving / left-side function argument type does not match right-side corresponding value type'
type WrongKeys = 'ERROR: All keys on the type for the left-side object must be in the right-side object'

type Evolve10<E extends AnyObject, I extends AnyObject > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : [I[K]] extends ExtractFunctionArguments<E[K]>
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve<I[K]>
            : E[K] extends number | string | symbol | any[]
                ? EvolvingValueNotAFunction<I[K]>
                : Evolve10< E[ K ], I[ K ]>
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve9<E extends AnyObject, I extends AnyObject > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : [I[K]] extends ExtractFunctionArguments<E[K]>
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve<I[K]>
            : E[K] extends number | string | symbol
                ? EvolvingValueNotAFunction<I[K]>
                : Evolve10< E[ K ], I[ K ]>
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve8<E extends AnyObject, I extends AnyObject > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : [I[K]] extends ExtractFunctionArguments<E[K]>
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve<I[K]>
            : E[K] extends number | string | symbol
                ? EvolvingValueNotAFunction<I[K]>
                : Evolve9< E[ K ], I[ K ]>
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve7<E extends AnyObject, I extends AnyObject > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : [I[K]] extends ExtractFunctionArguments<E[K]>
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve<I[K]>
            : E[K] extends number | string | symbol
                ? EvolvingValueNotAFunction<I[K]>
                : Evolve8< E[ K ], I[ K ]>
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve6<E extends AnyObject, I extends AnyObject > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : [I[K]] extends ExtractFunctionArguments<E[K]>
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve<I[K]>
            : E[K] extends number | string | symbol
                ? EvolvingValueNotAFunction<I[K]>
                : Evolve7< E[ K ], I[ K ]>
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve5<E extends AnyObject, I extends AnyObject > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : [I[K]] extends ExtractFunctionArguments<E[K]>
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve<I[K]>
            : E[K] extends number | string | symbol
                ? EvolvingValueNotAFunction<I[K]>
                : Evolve6< E[ K ], I[ K ]>
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve4<E extends AnyObject, I extends AnyObject > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : [I[K]] extends ExtractFunctionArguments<E[K]>
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve<I[K]>
            : E[K] extends number | string | symbol
                ? EvolvingValueNotAFunction<I[K]>
                : Evolve5< E[ K ], I[ K ]>
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve3<E extends AnyObject, I extends AnyObject > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : [I[K]] extends ExtractFunctionArguments<E[K]>
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve<I[K]>
              : E[K] extends number | string | symbol
                ? EvolvingValueNotAFunction<I[K]>
                : Evolve4< E[ K ], I[ K ]>
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve2<E extends AnyObject, I extends AnyObject > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : [I[K]] extends ExtractFunctionArguments<E[K]>
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve<I[K]>
            : E[K] extends number | string | symbol
                ? EvolvingValueNotAFunction<I[K]>
                : Evolve3< E[ K ], I[ K ]>
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]

// Lazy evaluated to prevent hangups
export type Evolve<E extends AnyObject, I extends AnyObject > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : [I[K]] extends ExtractFunctionArguments<E[K]>
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve<I[K]>
            : E[K] extends number | string | symbol
              ? EvolvingValueNotAFunction<I[K]>
              : Evolve2< E[ K ], I[ K ]>
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]

// straight-foward recursion
export type EvolveRecursive<E extends AnyObject, I extends AnyObject, FirstArgument = ExtractFunctionArguments<E[keyof E]>[0] > = KeySubset < E, I > extends true
  ? {
      [ K in keyof I ]: K extends keyof E
        ? E[K] extends AnyFunction
          ? [I[K]] extends ExtractFunctionArguments<E[K]>
            ? ExtractFunctionReturnValue<E[K]>
            : BadEvolve<I[K]>
          : EvolveRecursive< E[ K ], I[ K ]>
        : I[K]
    }
  : ContainsAny < [ E, I ], {}, WrongKeys >
