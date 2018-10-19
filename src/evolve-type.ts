/** @module evolve-type.ts */
import { AnyFunction, AnyObject, ContainsAny, ContainsType, ExtractFunctionArguments, ExtractFunctionReturnValue, IsAny, KeySubset } from './helper-types'
type Evolve10<E extends AnyObject, I extends AnyObject, BadEvolve = 'ERROR: Evolving / left-side function argument type does not match right-side corresponding value type', WrongKeys = 'ERROR: All keys on the type for the left-side object must be in the right-side object' > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : ExtractFunctionArguments<E[K]>[0] extends I[K]
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve
            : Evolve10< E[ K ], I[ K ], BadEvolve, WrongKeys >
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve9<E extends AnyObject, I extends AnyObject, BadEvolve = 'ERROR: Evolving / left-side function argument type does not match right-side corresponding value type', WrongKeys = 'ERROR: All keys on the type for the left-side object must be in the right-side object' > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : ExtractFunctionArguments<E[K]>[0] extends I[K]
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve
            : Evolve10< E[ K ], I[ K ], BadEvolve, WrongKeys >
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve8<E extends AnyObject, I extends AnyObject, BadEvolve = 'ERROR: Evolving / left-side function argument type does not match right-side corresponding value type', WrongKeys = 'ERROR: All keys on the type for the left-side object must be in the right-side object' > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : ExtractFunctionArguments<E[K]>[0] extends I[K]
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve
            : Evolve9< E[ K ], I[ K ], BadEvolve, WrongKeys >
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve7<E extends AnyObject, I extends AnyObject, BadEvolve = 'ERROR: Evolving / left-side function argument type does not match right-side corresponding value type', WrongKeys = 'ERROR: All keys on the type for the left-side object must be in the right-side object' > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : ExtractFunctionArguments<E[K]>[0] extends I[K]
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve
            : Evolve8< E[ K ], I[ K ], BadEvolve, WrongKeys >
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve6<E extends AnyObject, I extends AnyObject, BadEvolve = 'ERROR: Evolving / left-side function argument type does not match right-side corresponding value type', WrongKeys = 'ERROR: All keys on the type for the left-side object must be in the right-side object' > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : ExtractFunctionArguments<E[K]>[0] extends I[K]
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve
            : Evolve7< E[ K ], I[ K ], BadEvolve, WrongKeys >
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve5<E extends AnyObject, I extends AnyObject, BadEvolve = 'ERROR: Evolving / left-side function argument type does not match right-side corresponding value type', WrongKeys = 'ERROR: All keys on the type for the left-side object must be in the right-side object' > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : ExtractFunctionArguments<E[K]>[0] extends I[K]
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve
            : Evolve6< E[ K ], I[ K ], BadEvolve, WrongKeys >
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve4<E extends AnyObject, I extends AnyObject, BadEvolve = 'ERROR: Evolving / left-side function argument type does not match right-side corresponding value type', WrongKeys = 'ERROR: All keys on the type for the left-side object must be in the right-side object' > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : ExtractFunctionArguments<E[K]>[0] extends I[K]
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve
            : Evolve5< E[ K ], I[ K ], BadEvolve, WrongKeys >
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve3<E extends AnyObject, I extends AnyObject, BadEvolve = 'ERROR: Evolving / left-side function argument type does not match right-side corresponding value type', WrongKeys = 'ERROR: All keys on the type for the left-side object must be in the right-side object' > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : ExtractFunctionArguments<E[K]>[0] extends I[K]
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve
            : Evolve4< E[ K ], I[ K ], BadEvolve, WrongKeys >
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]
type Evolve2<E extends AnyObject, I extends AnyObject, BadEvolve = 'ERROR: Evolving / left-side function argument type does not match right-side corresponding value type', WrongKeys = 'ERROR: All keys on the type for the left-side object must be in the right-side object' > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : ExtractFunctionArguments<E[K]>[0] extends I[K]
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve
            : Evolve3< E[ K ], I[ K ], BadEvolve, WrongKeys >
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]

// Lazy evaluated to prevent hangups
export type Evolve<E extends AnyObject, I extends AnyObject, BadEvolve = 'ERROR: Evolving / left-side function argument type does not match right-side corresponding value type', WrongKeys = 'ERROR: All keys on the type for the left-side object must be in the right-side object' > = {
  'evaluate': ContainsType<[E, I], {}> extends true
    ? {}
    : {
        [ K in keyof I ]: K extends keyof E
          ? E[K] extends AnyFunction
            ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
              ? ExtractFunctionReturnValue<E[K]>
              : ExtractFunctionArguments<E[K]>[0] extends I[K]
                ? ExtractFunctionReturnValue<E[K]>
                : BadEvolve
            : Evolve2< E[ K ], I[ K ], BadEvolve, WrongKeys >
          : I[K]
      }
  'done': ContainsAny < [ E, I], {}, WrongKeys>,
}[
  KeySubset < E, I > extends true
    ? 'evaluate'
    : 'done'
]

// straight-foward recursion
export type EvolveRecursive<E extends AnyObject, I extends AnyObject, BadEvolve = 'ERROR: Evolving / left-side function argument type does not match right-side corresponding value type', WrongKeys = 'ERROR: All keys on the type for the left-side object must be in the right-side object' > = KeySubset < E, I > extends true
  ? {
      [ K in keyof I ]: K extends keyof E
        ? E[K] extends AnyFunction
          ? IsAny<ExtractFunctionArguments<E[K]>[0]> extends true
            ? ExtractFunctionReturnValue<E[K]>
            : ExtractFunctionArguments<E[K]>[0] extends I[K]
              ? ExtractFunctionReturnValue<E[K]>
              : BadEvolve
          : Evolve2< E[ K ], I[ K ], BadEvolve, WrongKeys >
        : I[K]
    }
  : ContainsAny < [ E, I], {}, WrongKeys>
