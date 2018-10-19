/** @module function/complementWithArity.ts */

export function complementWithArity( fn: ( ...a: any[] ) => any, arity: number, ...args: any[] ): ( ...args: any[] ) => boolean | ( ( ...a: any[ ] ) => any ) {
  return args.length <= arity ? !fn( ...args ) as boolean : complementWithArity.bind( null, fn, args.length - arity, ...args )
}

export default complementWithArity
