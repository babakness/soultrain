import {assign, assoc, getPathValue} from './object'
import { times } from './flow';
import { splitAt, head, last, init } from './array';
import { identity, curry, untypedCurry, pipeline, pipe, compose, defineFunctionProperties } from './function';
import { trace, traceWithLabel } from './logging';
import {HKT, URIS, Type, URI2HKT2} from 'fp-ts/lib/HKT'
import { isNullable, isFunction } from './check';
import { nothing, Maybe } from './maybe';
import { dec } from './math';




const doDeepCopyOnBranch = node => 
           node instanceof Object 
    &&  !( node instanceof Date ) 
    &&  !( node instanceof String ) 
    &&  !( node instanceof Function )

const mapObject = (fn, obj): any[] => {
  let arr: any[] = []
  for(let prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      arr.push(fn(prop,obj[prop],obj))
    }
  }
  return arr
}

export const DELETE: unique symbol = Symbol() 

const traceType = a => (console.log(typeof a,a),a)
const shouldUpdate = (level,key,path) => level === dec(path.length) && key === String(last(path))
const dangerouslyMutateObjValue = (key,value,obj) =>  (obj[key] = value,obj)

export const _lens = ( path: any[], fn, defaultValue, source, level=0 ) => 
  mapObject(
    ( key, node ) =>
      ( !doDeepCopyOnBranch( node ) ) //|| path.indexOf(key) !== level)
        // don't deep copy if not object, array, or in path
        ? [ key, node ]
        // deep copy, not particularly optimized recurssion
        : String( path[ level ] ) !== String( key )
          ? [ key, node ] 
          : [ key, _lens( path, fn, defaultValue, node ,level+1 )],
    source
  )
  .reduce( 
    ( acc, [ key, value ] , index) => 
      !shouldUpdate( level, key, path )
        // if not the last value in the lens path, mutated accumletator
        ? dangerouslyMutateObjValue( key, value, acc )
        // otherwise, computed the new value and only mutated accumelator with the value 
        // if the request to delete the node by returning the DELETE type isn't sent.
        : pipeline( 
            value == null 
              ? typeof defaultValue === 'undefined'
                ? value
                : defaultValue
              : fn( value ),
            computedValue => computedValue === DELETE 
              ? acc 
              : dangerouslyMutateObjValue( key, computedValue, acc )
          ),
    source instanceof Array ? [] : {}
  )

const _curriedLens = untypedCurry((path, fn, defaultValue, source) => _lens(path, fn, defaultValue, source,))

export function lens<L,K1 extends keyof L, D extends L[K1],A>(path: [K1], fn: (pathData: D) => A, defaultValue: A, source: L) : L 
export function lens<L,K1 extends keyof L, K2 extends keyof L[K1], D extends L[K1][K2],A>(path: [K1,K2], fn: (pathData: D) => A, defaultValue: A, source: L) : L 
export function lens<L,K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2],  D extends L[K1][K2][K3],A>(path: [K1,K2,K3], fn: (pathData: D) => A, defaultValue: A, source: L) : L 
export function lens<L,K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2],  K4 extends keyof L[K1][K2][K3], D extends L[K1][K2][K3][K4],A>(path: [K1,K2,K3,K4], fn: (pathData: D) => A, defaultValue: A, source: L) : L 
export function lens<L,K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2],  K4 extends keyof L[K1][K2][K3],  K5 extends keyof L[K1][K2][K3][K4], D extends L[K1][K2][K3][K4][K5],A>(path: [K1,K2,K3,K4,K5], fn: (pathData: D) => A, defaultValue: A, source: L) : L 
export function lens<L,K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2],  K4 extends keyof L[K1][K2][K3],  K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], D extends L[K1][K2][K3][K4][K5][K6],A>(path: [K1,K2,K3,K4,K5,K6], fn: (pathData: D) => A, defaultValue: A, source: L) : L 
export function lens<L,K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2],  K4 extends keyof L[K1][K2][K3],  K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], D extends L[K1][K2][K3][K4][K5][K6][K7],A>(path: [K1,K2,K3,K4,K5,K6,K7], fn: (pathData: D) => A, defaultValue: A, source: L) : L 
export function lens<L,K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2],  K4 extends keyof L[K1][K2][K3],  K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], D extends L[K1][K2][K3][K4][K5][K6][K7][K8],A>(path: [K1,K2,K3,K4,K5,K6,K7,K8], fn: (pathData: D) => A, defaultValue: A, source: L) : L 
export function lens<L,K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2],  K4 extends keyof L[K1][K2][K3],  K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], D extends L[K1][K2][K3][K4][K5][K6][K7][K8][K9],A>(path: [K1,K2,K3,K4,K5,K6,K7,K8,K9], fn: (pathData: D) => A, defaultValue: A, source: L) : L 
export function lens<L,K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2],  K4 extends keyof L[K1][K2][K3],  K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9], D extends L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10],A>(path: [K1,K2,K3,K4,K5,K6,K7,K8,K9,K10], fn: (pathData: D) => A, defaultValue: A, source: L) : L 
export function lens<P,PK extends keyof P, D, A,L>(path: P[], fn: (pathData: D) => A, defaultValue: A) : ( source: L) => L
export function lens<P,PK extends keyof P, D, A,L>(path: P[], fn: (pathData: D) => A) : (defaultValue: A) => ( source: L) => L
export function lens<P,PK extends keyof P, D, A,L>(path: P[]) : <B extends A>(fn: (pathData: D) => B) => (defaultValue: B) => ( source: L) => L
export function lens(...args)
{
  return _curriedLens(...args)
} 



function _foldAndRead(this: Lens3<{},{}>, defaultValue,data) {
  return pipeline(
    lens( this.path , this.run( [ defaultValue, data ] ), defaultValue, data ),
    processedData => [processedData, getPathValue(this.path,processedData), getPathValue(this.path,data)]
  )  
}

function _fold(this: Lens3<{},{}>, defaultValue,data) {
  return lens( this.path , this.run( [ defaultValue, data ] ), defaultValue, data )
}

function _read(this: Lens3<{},{}>, defaultValue, data ) {
  return getPathValue(
    this.path,
    lens( this.path , this.run( [ defaultValue, data ] ), defaultValue, data )
  )
}

function _write(this: Lens3<{},{}>, value, data ) {
  return lens( this.path , ( [ defaultValue, data ] ) => value , value, data )
}

export class Lens3<L,A>  {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: 'babakness/lens'
  static readonly _URI: 'babakness/lens'
  constructor(readonly path, readonly run = a => b => b) {}

  static type<A>(){
    return new Lens3<A,{}>(undefined)
  }

  //(method) Lens<L, A>.of<A>(path: A): Lens<{}, {}>

  static of<A>(path:A | undefined | null): Lens3<{}, NonNullable<A>> {
    return new Lens3(path)
  }

  of<K1 extends keyof L>(path: [K1]): Lens3<L,NonNullable<L[K1]>>
  of<K1 extends keyof L, K2 extends keyof L[K1]>(path:  [K1,K2] ): Lens3<L,NonNullable<L[K1][K2]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2]>( path: [K1, K2, K3] ): Lens3<L,NonNullable<L[K1][K2][K3]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3]>( path:  [K1, K2, K3, K4] ): Lens3<L,NonNullable<L[K1][K2][K3][K4]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4]>(  path:  [K1, K2, K3, K4, K5] ): Lens3<L,NonNullable<L[K1][K2][K3][K4][K5]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5]>( path:  [K1, K2, K3, K4, K5, K6]): Lens3<L,NonNullable<L[K1][K2][K3][K4][K5][K6]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6]>(  path:  [K1, K2, K3, K4, K5, K6, K7] ): Lens3<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7]>( path: [K1, K2, K3, K4, K5, K6, K7, K8] ): Lens3<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9]): Lens3<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10] ): Lens3<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>>
  of(path): any
  {
    return new Lens3(path)
  }

  from<K1 extends keyof L>(...path: [K1]): Lens3<L,NonNullable<L[K1]>>
  from<K1 extends keyof L, K2 extends keyof L[K1]>(...path:  [K1,K2] ): Lens3<L,NonNullable<L[K1][K2]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2]>( ...path: [K1, K2, K3] ): Lens3<L,NonNullable<L[K1][K2][K3]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3]>( ...path:  [K1, K2, K3, K4] ): Lens3<L,NonNullable<L[K1][K2][K3][K4]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4]>(  ...path:  [K1, K2, K3, K4, K5] ): Lens3<L,NonNullable<L[K1][K2][K3][K4][K5]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5]>( ...path:  [K1, K2, K3, K4, K5, K6]): Lens3<L,NonNullable<L[K1][K2][K3][K4][K5][K6]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6]>(  ...path:  [K1, K2, K3, K4, K5, K6, K7] ): Lens3<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7]>( ...path: [K1, K2, K3, K4, K5, K6, K7, K8] ): Lens3<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8]>( ...path: [K1, K2, K3, K4, K5, K6, K7, K8, K9]): Lens3<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>( ...path: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10] ): Lens3<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>>
  from(...path): any
  {
    return new Lens3(path)
  }


  map<B>(fn: (pathValue: A) => B): Lens3<L,B> {
    return new Lens3<L,B>(this.path, ([defaultValue,data]: [A | B,L]) => (pathValue:A) => fn(this.run([defaultValue,data])(pathValue)) )
  }

  // given time constraints, could not effectively workout making this Foldable Functor a Monad.
  // chain<B>(fn: (pathValue: A) => Lens<L,B>): Lens<L,B> {
  //   // return new Lens<L,B>(this.path, (pathValue:A) => fn(this.run(pathValue)).run(pathValue) )
  //   return new Lens<L,B>(fn(undefined as any).path, ([defaultValue,data]) => (pathValue) => {
  //     const calculatedData = lens(this.path,this.run([defaultValue,data]),defaultValue,data)
  //     console.log(this.path,calculatedData)
  //     return 9999 // returns the pathvalue of next iteration
  //   } )
  // }

  // not sure, not implementing given time constraint
  // ap<B>(fab: Lens<{}, (pathValue: A) => B>): Lens<L,B> {
  //   return new Lens<L,B>(this.path, (pathValue:A) => fab.run(pathValue).run(pathValue))
  // }

  preRead<Data extends L, Default extends A>(data: Data) : A {
    return getPathValue(this.path,data) as any as A
  }

  read<Data extends L, Default extends A>(defaultValue: Default) : (data: Data) => A 
  read<Data extends L, Default extends A>(defaultValue: Default, data: Data) : A 
  read(...args)
  {
    return untypedCurry(_read.bind(this))(...args)
  }

  write<Data extends L, Default extends A | typeof DELETE>(writeValue: Default) : (data: Data ) => L 
  write<Data extends L, Default extends A | typeof DELETE>(writeValue: Default, data: Data ) : L 
  write(...args){
    return untypedCurry(_write.bind(this))(...args)
  }

  fold<Data extends L, Default extends A | typeof DELETE>(defaultValue: Default) : (data: Data ) => L 
  fold<Data extends L, Default extends A | typeof DELETE>(defaultValue: Default, data: Data ) : L 
  fold(...args){
    return untypedCurry(_fold.bind(this))(...args)
  }

  foldAndRead<Data extends L, Default extends A | typeof DELETE>(defaultValue: Default) : (data: Data ) => [L,A,A] 
  foldAndRead<Data extends L, Default extends A | typeof DELETE>(defaultValue: Default, data: Data ) : [L,A,A] 
  foldAndRead(...args) {
    return untypedCurry(_foldAndRead.bind(this))(...args)
  }
  // not needed
  // mapUnlessNullable<B>(fn: (pathValue: A) => B): Lens<L,B> {
  //   return new Lens<L,B>(this.path, (pathValue:A) => isNullable(pathValue) ? pathValue : fn(this.run(pathValue)) )
  // }

}



export class Lens<L,A>  {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: 'babakness/lens'
  static readonly _URI: 'babakness/lens'

  constructor( readonly pathAndDefaultValue, readonly run = a => b => b) {
    
  }

  static type<A>(){
    return new Lens<A,{}>(undefined)
  }

  //(method) Lens2<L, A>.of<A>(pathAndDefaultValue: A): Lens2<{}, {}>

  static of<A>(pathAndDefaultValue: any[][]): Lens<{}, NonNullable<A>> {
    return new Lens(pathAndDefaultValue)
  }

  of<K1 extends keyof L>(pathAndDefaultValue: [[K1],NonNullable<L[K1]>]): Lens<L,NonNullable<L[K1]>>
  of<K1 extends keyof L, K2 extends keyof L[K1]>(pathAndDefaultValue: [ [K1,K2] ,NonNullable<L[K1][K2]>]): Lens<L,NonNullable<L[K1][K2]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2]>( pathAndDefaultValue: [[K1, K2, K3] ,NonNullable<L[K1][K2][K3]>]): Lens<L,NonNullable<L[K1][K2][K3]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3]>( pathAndDefaultValue: [ [K1, K2, K3, K4] ,NonNullable<L[K1][K2][K3][K4]>]): Lens<L,NonNullable<L[K1][K2][K3][K4]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4]>(  pathAndDefaultValue: [ [K1, K2, K3, K4, K5] ,NonNullable<L[K1][K2][K3][K4][K5]>]): Lens<L,NonNullable<L[K1][K2][K3][K4][K5]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5]>( pathAndDefaultValue: [ [K1, K2, K3, K4, K5, K6],NonNullable<L[K1][K2][K3][K4][K5][K6]>]): Lens<L,NonNullable<L[K1][K2][K3][K4][K5][K6]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6]>(  pathAndDefaultValue: [ [K1, K2, K3, K4, K5, K6, K7] ,NonNullable<L[K1][K2][K3][K4][K5][K6][K7]>]): Lens<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7]>( pathAndDefaultValue: [[K1, K2, K3, K4, K5, K6, K7, K8] ,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8]>]): Lens<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8]>( pathAndDefaultValue: [[K1, K2, K3, K4, K5, K6, K7, K8, K9],NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>]): Lens<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>( pathAndDefaultValue: [[K1, K2, K3, K4, K5, K6, K7, K8, K9, K10] ,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>]): Lens<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>>
  of( pathAndDefaultValue ): any
  {
    return new Lens( pathAndDefaultValue, a => b => b)
  }

  from<K1 extends keyof L>(path: [K1], defaultValue: NonNullable<L[K1]>): Lens<L,NonNullable<L[K1]>>
  from<K1 extends keyof L, K2 extends keyof L[K1]>(path: [K1,K2], defaultValue: NonNullable<L[K1][K2]>): Lens<L,NonNullable<L[K1][K2]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2]>( path: [K1, K2, K3], defaultValue: NonNullable<L[K1][K2][K3]>): Lens<L,NonNullable<L[K1][K2][K3]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3]>( path: [K1, K2, K3, K4], defaultValue: NonNullable<L[K1][K2][K3][K4]>): Lens<L,NonNullable<L[K1][K2][K3][K4]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4]>(  path: [K1, K2, K3, K4, K5], defaultValue: NonNullable<L[K1][K2][K3][K4][K5]>): Lens<L,NonNullable<L[K1][K2][K3][K4][K5]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5]>( path: [K1, K2, K3, K4, K5, K6], defaultValue: NonNullable<L[K1][K2][K3][K4][K5][K6]>): Lens<L,NonNullable<L[K1][K2][K3][K4][K5][K6]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6]>(  path: [K1, K2, K3, K4, K5, K6, K7], defaultValue: NonNullable<L[K1][K2][K3][K4][K5][K6][K7]>): Lens<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7]>( path: [K1, K2, K3, K4, K5, K6, K7, K8], defaultValue: NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8]>): Lens<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9], defaultValue: NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>): Lens<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10], defaultValue: NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>): Lens<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>>
  from( path, defaultValue ): any
  {
    return new Lens( [path, defaultValue], a => b => b )
  }

  map<B>(fn: (pathValue: A) => B): Lens<L,B> {
    // const [path,defaultValue] = this.pathAndDefaultValue
    // const broseph =  data => ( pathValue: A ) => fn( this.run( data )( pathValue ) )
    return new Lens<L,B>( this.pathAndDefaultValue, data => ( pathValue: A ) => fn( this.run( data )( pathValue ) ) ) 
  }

  ap<B>(fab: Lens<L,(pathValue: A) => B> ): Lens<L,B> {
    // const [path,defaultValue] = this.pathAndDefaultValue
    return new Lens<L,B>( this.pathAndDefaultValue, data => (pathValue: A) => fab.map( fn => fn(pathValue)).read(data)  )
  }

  join<Data extends L>(data: Data ) : L {
    const [ path, defaultValue ] = this.pathAndDefaultValue
    
    return lens( path , this.run( data  ), defaultValue, data )
  }

  fold<Data extends L, B>(data: Data, fn: (pathValue: A) => B ) : L 
  fold<Data extends L, B>(data: Data) : (fn: (pathValue: A) => B ) => L 
  fold(...args)
  {
    return untypedCurry(
      (fn, data) => this.map(fn).join(data)
    )(...args)
  }

  write<Data extends L, B>( writeValue: A ) : ( data: Data, ) => L 
  write<Data extends L, B>( writeValue: A , data: Data, ) : L
  write(...args){
    return untypedCurry(
      (writeValue, data) => this.fold(data, _ => writeValue)
    )(...args) 
  }

  reduce<Data extends L, B>(fn: (pathValue: A) => B ) : ( data: Data, ) => L 
  reduce<Data extends L, B>(fn: (pathValue: A) => B , data: Data, ) : L
  reduce(...args)
  {
    return untypedCurry(
      (fn, data) => this.map(fn).join(data)
    )(...args) 
  }

  joinAndRead<Data extends L, B>( data: Data, ) : [L,A,A] {
    const [path,defaultValue] = this.pathAndDefaultValue
    const fn = a => a
    return pipeline(
        this.map(fn).join(data),
        pData => [ pData, getPathValue( path, pData ), getPathValue( path, data ) ]
      ) as [L,A,A]
  }

  reduceAndRead<Data extends L, B>(fn: (pathValue: A) => B ) : ( data: Data, ) => L 
  reduceAndRead<Data extends L, B>(fn: (pathValue: A) => B , data: Data, ) : L
  reduceAndRead(...args)
  {
    return untypedCurry(
      (fn, data) => this.map(fn).joinAndRead(data)
    )
  }

  read<Data extends L>( data: Data, ) : A {
    const [path,defaultValue] = this.pathAndDefaultValue
    return getPathValue( path, this.reduce( a => a ,data) ) as any as A
  }

  preRead<Data extends L>( data: Data, ) : A {
    const [path,defaultValue] = this.pathAndDefaultValue
    return getPathValue( path, data ) as any as A
  }


}






export class LensExperimental<L,A>  {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: 'babakness/lens'
  static readonly _URI: 'babakness/lens'
  private static readonly chainHelperName = 'chainHelper'
  private static readonly isComposableLensMorphism = (item): item is <E>(data:E) => (<C,D>(pathValue: C) => D ) => 
    typeof item === 'function' 
      && item.name !== LensExperimental.chainHelperName
  private static readonly isChainHelper = (item): item is (<C,D>(pathValue: C) => Lens<{},D> ) => 
  typeof item === 'function' 
    && item.name === LensExperimental.chainHelperName
  constructor( readonly program: any[]) {
    
  }

  static type<A>(){
    return new LensExperimental<A,{}>([])
  }

  static of<A>(pathAndDefaultValue: any[][]): LensExperimental<{}, NonNullable<A>> {
    return new LensExperimental( [] )
  }

  of<K1 extends keyof L>(pathAndDefaultValue: [[K1],NonNullable<L[K1]>]): LensExperimental<L,NonNullable<L[K1]>>
  of<K1 extends keyof L, K2 extends keyof L[K1]>(pathAndDefaultValue: [ [K1,K2] ,NonNullable<L[K1][K2]>]): LensExperimental<L,NonNullable<L[K1][K2]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2]>( pathAndDefaultValue: [[K1, K2, K3] ,NonNullable<L[K1][K2][K3]>]): LensExperimental<L,NonNullable<L[K1][K2][K3]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3]>( pathAndDefaultValue: [ [K1, K2, K3, K4] ,NonNullable<L[K1][K2][K3][K4]>]): LensExperimental<L,NonNullable<L[K1][K2][K3][K4]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4]>(  pathAndDefaultValue: [ [K1, K2, K3, K4, K5] ,NonNullable<L[K1][K2][K3][K4][K5]>]): LensExperimental<L,NonNullable<L[K1][K2][K3][K4][K5]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5]>( pathAndDefaultValue: [ [K1, K2, K3, K4, K5, K6],NonNullable<L[K1][K2][K3][K4][K5][K6]>]): LensExperimental<L,NonNullable<L[K1][K2][K3][K4][K5][K6]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6]>(  pathAndDefaultValue: [ [K1, K2, K3, K4, K5, K6, K7] ,NonNullable<L[K1][K2][K3][K4][K5][K6][K7]>]): LensExperimental<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7]>( pathAndDefaultValue: [[K1, K2, K3, K4, K5, K6, K7, K8] ,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8]>]): LensExperimental<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8]>( pathAndDefaultValue: [[K1, K2, K3, K4, K5, K6, K7, K8, K9],NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>]): LensExperimental<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>>
  of<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>( pathAndDefaultValue: [[K1, K2, K3, K4, K5, K6, K7, K8, K9, K10] ,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>]): LensExperimental<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>>
  of( pathAndDefaultValue ): any
  {
    return new LensExperimental( [ pathAndDefaultValue ] )
  }

  from<K1 extends keyof L>(path: [K1], defaultValue: NonNullable<L[K1]>): LensExperimental<L,NonNullable<L[K1]>>
  from<K1 extends keyof L, K2 extends keyof L[K1]>(path: [K1,K2], defaultValue: NonNullable<L[K1][K2]>): LensExperimental<L,NonNullable<L[K1][K2]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2]>( path: [K1, K2, K3], defaultValue: NonNullable<L[K1][K2][K3]>): LensExperimental<L,NonNullable<L[K1][K2][K3]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3]>( path: [K1, K2, K3, K4], defaultValue: NonNullable<L[K1][K2][K3][K4]>): LensExperimental<L,NonNullable<L[K1][K2][K3][K4]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4]>(  path: [K1, K2, K3, K4, K5], defaultValue: NonNullable<L[K1][K2][K3][K4][K5]>): LensExperimental<L,NonNullable<L[K1][K2][K3][K4][K5]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5]>( path: [K1, K2, K3, K4, K5, K6], defaultValue: NonNullable<L[K1][K2][K3][K4][K5][K6]>): LensExperimental<L,NonNullable<L[K1][K2][K3][K4][K5][K6]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6]>(  path: [K1, K2, K3, K4, K5, K6, K7], defaultValue: NonNullable<L[K1][K2][K3][K4][K5][K6][K7]>): LensExperimental<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7]>( path: [K1, K2, K3, K4, K5, K6, K7, K8], defaultValue: NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8]>): LensExperimental<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9], defaultValue: NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>): LensExperimental<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>>
  from<K1 extends keyof L, K2 extends keyof L[K1], K3 extends keyof L[K1][K2], K4 extends keyof L[K1][K2][K3], K5 extends keyof L[K1][K2][K3][K4], K6 extends keyof L[K1][K2][K3][K4][K5], K7 extends keyof L[K1][K2][K3][K4][K5][K6], K8 extends keyof L[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof L[K1][K2][K3][K4][K5][K6][K7][K8][K9]>( path: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10], defaultValue: NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>): LensExperimental<L,NonNullable<L[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>>
  from( path, defaultValue ): any
  {
    return new LensExperimental( [ path, defaultValue ] )
  }

  map<B>(fn: (pathValue: A) => B): LensExperimental<L,B> {
    return new LensExperimental<L,B>( this.mapProgram( (dataOut: L) => fn) ) 
  }

  private mapProgram<B>(fn: (data: L) => (pathValue: A) => B){
    return pipeline(
        last( this.program ),
        lastProgram => init( this.program ).concat(
        LensExperimental.isComposableLensMorphism( lastProgram ) 
          ? [ (dataOut: L) => (pathValue:A) => fn( dataOut )( lastProgram( dataOut )( pathValue ))  ] 
          : [ lastProgram, fn ]
      )
    )
  }


  ap<B>(fab: LensExperimental<L, (pathValue: A) => B> ): LensExperimental<L,B> {    
  
    return new LensExperimental<L,B>( 
      this.mapProgram(  data => pathValue => fab.read(data)(pathValue) )  
    )
    // return fab.chain( fn => this.map( (pathValue:A) => fn(pathValue)) ) 
  }

  chain<B>(fn: (pathValue: A) => LensExperimental<L,B>): LensExperimental<L,B> {
    return new LensExperimental<L,B>( this.chainProgram( data => fn ) ) 
  }

  private getChainHelper<B>(fn: (data: L) => (pathValue: A) => B): (data:L) => (pathValue : A) => B {
    const that = this
    return defineFunctionProperties(
      function chainHelper(data){
        return ( pathValue: A ) => fn(data)( pathValue )
      },
      { name: LensExperimental.chainHelperName }
    )
  }

  private chainProgram<B>(fn: (data: L) => (pathValue: A) => B) : any[] {
    return this.program.concat( this.getChainHelper(fn)  )
  }

  join( this: any, dataIn: L ): L {

    const handleChain = (dataOut,chainHelper,_path,_default) => {
      const newLensExperimental = chainHelper(dataOut)(getPathValue(_path as any,dataOut))
      const [p,d] = head( newLensExperimental.program )
      const powerData = newLensExperimental.join(dataOut)

      return [powerData,p,d]
    }

    const applyMorphism = ( dataOut, fn, path, defaultValue ) => [
      lens( path, fn(dataOut), defaultValue, dataOut ),
      path, 
      defaultValue 
    ]
      
    const programReducer = ( [ dataOut , path , defaultValue ] : [ L, any[], A ], item: Function | any[] ) => { 
      return isFunction( item )
        // item is a function
        ? LensExperimental.isChainHelper( item )
          ? handleChain( dataOut, item, path, defaultValue )
          : applyMorphism( dataOut, item, path, defaultValue )
        // item is an array
        : [ dataOut, head( item ), last( item ) ]

    }

    return head(
      this.program.reduce( 
        programReducer, 
        [ 
          dataIn, 
          head( head( this.program ) ), 
          last( head( this.program ) ) 
        ] 
      )
    )
  }


  // _join<Data extends L>(data: Data ) : L {
  //   const [ path, defaultValue ] = this.pathAndDefaultValue
    
  //   return lens( path , this.run( data  ), defaultValue, data )
  // }

  fold<Data extends L, B>(data: Data, fn: (pathValue: A) => B ) : L 
  fold<Data extends L, B>(data: Data) : (fn: (pathValue: A) => B ) => L 
  fold(...args)
  {
    return untypedCurry(
      (fn, data) => this.map(fn).join(data)
    )(...args)
  }

  write<Data extends L, B>( writeValue: A ) : ( data: Data, ) => L 
  write<Data extends L, B>( writeValue: A , data: Data, ) : L
  write(...args){
    return untypedCurry(
      (writeValue, data) => this.fold(data, _ => writeValue)
    )(...args) 
  }

  reduce<Data extends L, B>(fn: (pathValue: A) => B ) : ( data: Data, ) => L 
  reduce<Data extends L, B>(fn: (pathValue: A) => B , data: Data, ) : L
  reduce(...args)
  {
    return untypedCurry(
      (fn, data) => this.map(fn).join(data)
    )(...args) 
  }

  joinAndRead<Data extends L, B>( data: Data, ) : [L,A,A] {
    const [path,defaultValue] = head( this.program )
    const fn = a => a
    return pipeline(
        this.map(fn).join(data),
        pData => [ pData, getPathValue( path, pData ), getPathValue( path, data ) ]
      ) as [L,A,A]
  }

  reduceAndRead<Data extends L, B>(fn: (pathValue: A) => B ) : ( data: Data, ) => L 
  reduceAndRead<Data extends L, B>(fn: (pathValue: A) => B , data: Data, ) : L
  reduceAndRead(...args)
  {
    return untypedCurry(
      (fn, data) => this.map(fn).joinAndRead(data)
    )
  }

  read<Data extends L>( data: Data, ) : A {
    const [path,defaultValue] = head( this.program )
    return getPathValue( path, this.reduce( a => a ,data) ) as any as A
  }

  preRead<Data extends L>( data: Data, ) : A {
    const [path,defaultValue] = head( this.program )
    return getPathValue( path, data ) as any as A
  }


}



// const bro = {
//   a:1,
//   b: {c : 2}
// }
// Lens2.type<typeof bro>().of([ ['b','c'], 0 ])

// const ff = getPathValue(['b'],bro)




// export const ask = <E>(): Lens<E, E> => {
//   return new Lens([],identity)
// }

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L,A> {
    'babakness/lens': Lens3<L,A>,
  }
}


// type Brah = [
//   [1,0,0]
// ]

// const broz = Lens.type<Brah>().of([0,5])//.default(1)
// const brozz = Lens.of(['a','b'])
// ; 

// var trampoline = (fn) => function (...args) {
//   var result = fn(...args)

//   while (result instanceof Function) {
//     result = result();
//   }

//   return result;

// }

// export function factorial (n) {
//   var _factorial = trampoline( function myself (acc, n) {
//     return n
//     ? function () { return myself(acc * n, n - 1); }
//     : acc
//   });

//   return _factorial(1, n);
// }

