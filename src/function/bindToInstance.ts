/** @module function/bindToInstance.ts */
import { AnyFunction, FunctionPropertyNames, ObjectPropertyNamesByType } from '../helper-types'
import { untypedCurry } from './untypedCurry'
/**
 * Bind an object or instance method's `this` to itself and return the resulting function
 * @param obj
 * @param method
 * const specialSlice = bindToInstance([1,2,3,4,5,6],'slice')
 * specialSlice(2,4) //=> [3,4]
 */
export function bindToInstance < T extends object, K extends FunctionPropertyNames<T>>( obj: T, method: K ): T[ K ] extends AnyFunction ? T[ K ] : never
export function bindToInstance < T extends object, K extends FunctionPropertyNames<T>>( obj: T ): ( method: K ) => T[ K ] extends AnyFunction ? T[ K ] : never
export function bindToInstance( ...args ) {
  return untypedCurry( ( obj, method ) => obj[ method ].bind( obj ) )( ...args )
}

export default bindToInstance
