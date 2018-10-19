/** @module lens.ts */
import { HKT, Type, URI2HKT3, URIS} from 'fp-ts/lib/HKT'
import { head } from './array/head'
import { init } from './array/init'
import { last } from './array/last'
import { isFunction } from './check'
import { defineFunctionProperties } from './function/defineFunctionProperties'
import { pipeline } from './function/pipeline'
import { untypedCurry } from './function/untypedCurry'
import { Omit } from './helper-types'
import { DELETE, lens } from './lens-functions'
// import { trace } from './logging'
import { getPathValue } from './object'

type Path = Array<string | number | symbol>
type ProgramHead<Y, V, A> = [ Path, A ]
type ChainingFn<Y, V, U, L, A, B> = ( data: Y ) => ( pathValue: A ) => Lens<Y, V, U, L, B>
type MappingFn<Y, A, B> = ( data: Y ) => ( pathValue: A ) => B
type MapOrChainFn<Y, V, U, L, A, B> = ChainingFn<Y, V, U, L, A, B> | MappingFn<Y, A, B>
interface Programs<Y, V, U, L, A> extends Array<any> {
  [index: number]: ( ProgramHead<Y, V, A> | ChainingFn<Y, V, U, L, A, A> | MappingFn<V, A, A> )
  0: ProgramHead<Y, V, A>
}

type PathValue<V> =  NonNullable<V> // | typeof UNCHANGED | typeof DELETE
export class Lens<Y, V, U, L, A>  {
  static readonly _URI: 'babakness/lens'

  static type<Y, V = Y>() {
    return new Lens<Y, V, {}, {}, {}>( [] as any )
  }

  static typeChange<V, U>() {
    return new Lens<V, U, {}, {}, {}>( [] as any )
  }

  // static of<U, L = U, K1 extends keyof U & keyof L = keyof U & keyof L>( pathAndDefaultValue: [ [K1] , typeof DELETE]): Lens<U,Optional<L,K1>,PathValue<L[K1]> | undefined>
  static of<Y, V = Y, K1 extends keyof Y & keyof V = keyof Y & keyof V>( pathAndDefaultValue: [[K1]  , PathValue<V[K1]>] ): Lens<Y, V, PathValue<Y[K1]>, PathValue<V[K1]>, PathValue<Y[K1]>>
  static of<Y, V = Y, K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1]>( pathAndDefaultValue: [ [K1, K2]  , PathValue<V[K1][K2]>] ): Lens<Y, V, PathValue<Y[K1][K2]>, PathValue<V[K1][K2]>, PathValue<Y[K1][K2]>>
  static of<Y, V = Y, K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2]>( pathAndDefaultValue: [[K1, K2, K3]  , PathValue<V[K1][K2][K3]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3]>, PathValue<V[K1][K2][K3]>, PathValue<Y[K1][K2][K3]>>
  static of<Y, V = Y, K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] >( pathAndDefaultValue: [ [K1, K2, K3, K4]  , PathValue<V[K1][K2][K3][K4]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4]>, PathValue<V[K1][K2][K3][K4]>, PathValue<Y[K1][K2][K3][K4]>>
  static of<Y, V = Y, K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3], K5 extends keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] = keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] >( pathAndDefaultValue: [ [K1, K2, K3, K4, K5]  , PathValue<V[K1][K2][K3][K4][K5]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4][K5]>, PathValue<V[K1][K2][K3][K4][K5]>, PathValue<Y[K1][K2][K3][K4][K5]>>
  static of<Y, V = Y, K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3], K5 extends keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] = keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] , K6 extends keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5] = keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5]>( pathAndDefaultValue: [ [K1, K2, K3, K4, K5, K6]  , PathValue<V[K1][K2][K3][K4][K5][K6]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4][K5][K6]>, PathValue<V[K1][K2][K3][K4][K5][K6]>, PathValue<Y[K1][K2][K3][K4][K5][K6]>>
  static of<Y, V = Y, K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3], K5 extends keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] = keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] , K6 extends keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5] = keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5], K7 extends keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6] = keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6]>( pathAndDefaultValue: [ [K1, K2, K3, K4, K5, K6, K7]  , PathValue<V[K1][K2][K3][K4][K5][K6][K7]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4][K5][K6][K7]>, PathValue<V[K1][K2][K3][K4][K5][K6][K7]>, PathValue<Y[K1][K2][K3][K4][K5][K6][K7]>>
  static of<Y, V = Y, K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3], K5 extends keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] = keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] , K6 extends keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5] = keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5], K7 extends keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6] = keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6], K8 extends keyof Y[K1][K2][K3][K4][K5][K6][K7] & keyof V[K1][K2][K3][K4][K5][K6][K7] = keyof Y[K1][K2][K3][K4][K5][K6][K7] & keyof V[K1][K2][K3][K4][K5][K6][K7]>( pathAndDefaultValue: [[K1, K2, K3, K4, K5, K6, K7, K8]  , PathValue<V[K1][K2][K3][K4][K5][K6][K7][K8]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4][K5][K6][K7][K8]>, PathValue<V[K1][K2][K3][K4][K5][K6][K7][K8]>, PathValue<Y[K1][K2][K3][K4][K5][K6][K7][K8]>>
  static of<Y, V = Y, K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3], K5 extends keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] = keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] , K6 extends keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5] = keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5], K7 extends keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6] = keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6], K8 extends keyof Y[K1][K2][K3][K4][K5][K6][K7] & keyof V[K1][K2][K3][K4][K5][K6][K7] = keyof Y[K1][K2][K3][K4][K5][K6][K7] & keyof V[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof Y[K1][K2][K3][K4][K5][K6][K7][K8] & keyof V[K1][K2][K3][K4][K5][K6][K7][K8] = keyof Y[K1][K2][K3][K4][K5][K6][K7][K8] & keyof V[K1][K2][K3][K4][K5][K6][K7][K8]>( pathAndDefaultValue: [[K1, K2, K3, K4, K5, K6, K7, K8, K9]  , PathValue<V[K1][K2][K3][K4][K5][K6][K7][K8][K9]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4][K5][K6][K7][K8][K9]>, PathValue<V[K1][K2][K3][K4][K5][K6][K7][K8][K9]>, PathValue<Y[K1][K2][K3][K4][K5][K6][K7][K8][K9]>>
  static of<Y, V = Y, K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3], K5 extends keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] = keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] , K6 extends keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5] = keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5], K7 extends keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6] = keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6], K8 extends keyof Y[K1][K2][K3][K4][K5][K6][K7] & keyof V[K1][K2][K3][K4][K5][K6][K7] = keyof Y[K1][K2][K3][K4][K5][K6][K7] & keyof V[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof Y[K1][K2][K3][K4][K5][K6][K7][K8] & keyof V[K1][K2][K3][K4][K5][K6][K7][K8] = keyof Y[K1][K2][K3][K4][K5][K6][K7][K8] & keyof V[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof Y[K1][K2][K3][K4][K5][K6][K7][K8][K9] & keyof V[K1][K2][K3][K4][K5][K6][K7][K8][K9] = keyof Y[K1][K2][K3][K4][K5][K6][K7][K8][K9] & keyof V[K1][K2][K3][K4][K5][K6][K7][K8][K9]>( pathAndDefaultValue: [[K1, K2, K3, K4, K5, K6, K7, K8, K9, K10]  , PathValue<V[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>, PathValue<V[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>, PathValue<Y[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>>

  static of( pathAndDefaultValue ) {
    return new Lens( [ pathAndDefaultValue ] )
  }
  private static readonly chainHelperName = 'chainHelper'
  private static readonly isComposableLensMorphism = ( item ): item is <E>( data: E ) => ( <C, D>( pathValue: C ) => D ) =>
    typeof item === 'function'
      && item.name !== Lens.chainHelperName
  readonly _A!: A
  readonly _L!: V
  readonly _U!: Y
  readonly _URI!: 'babakness/lens'

  constructor( readonly program: Programs<Y, V, U, L, A> ) {

  }
  // Initial Object, Final Object, Initial Type, Current Type
  // of<K1 extends keyof Y & keyof V = keyof Y & keyof V>( this: Lens<Y,Y,{},{},{}>, pathAndDefaultValue: [ [K1] , typeof DELETE]): Lens<Y,Omit<V,K1>,PathValue<Y[K1]>,PathValue<V[K1]>,PathValue<Y[K1]>>
  // of<K1 extends keyof U & keyof L = keyof U & keyof L>( pathAndDefaultValue: [ [K1] , typeof DELETE]): Lens<U,Optional<L,K1>,PathValue<L[K1]> | undefined>
  of<K1 extends keyof Y & keyof V = keyof Y & keyof V>( pathAndDefaultValue: [[K1]  , PathValue<V[K1]>] ): Lens<Y, V, PathValue<Y[K1]>, PathValue<V[K1]>, PathValue<Y[K1]>>
  // of<K1 extends keyof Y = keyof Y >( pathAndDefaultValue: [ [K1] , typeof DELETE]): Lens<Y,V,PathValue<Y[K1]>,typeof DELETE,PathValue<Y[K1]>>
  // of<P extends Omit<V,keyof Y>,K1 extends keyof Y = keyof Y >( pathAndDefaultValue: [ [K1] , typeof DELETE]): Lens<Y,V,PathValue<Y[K1]>,typeof DELETE,PathValue<Y[K1]>>
  of<K1 extends keyof Y = keyof Y >( pathAndDefaultValue: [ [K1] , typeof DELETE] ): Lens<Y, V extends Y ? Omit<Y, K1> : V, PathValue<Y[K1]>, typeof DELETE, PathValue<Y[K1]>>
  // of<K1 extends keyof Y, V extends Omit<Y,K1> >( pathAndDefaultValue: [ [K1] , typeof DELETE]): Lens<Y,V,PathValue<Y[K1]>,typeof DELETE,PathValue<Y[K1]>>
  of<K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1]>( pathAndDefaultValue: [ [K1, K2]  , PathValue<V[K1][K2]>] ): Lens<Y, V, PathValue<Y[K1][K2]>, PathValue<V[K1][K2]>, PathValue<Y[K1][K2]>>
  of<K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2]>( pathAndDefaultValue: [[K1, K2, K3]  , PathValue<V[K1][K2][K3]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3]>, PathValue<V[K1][K2][K3]>, PathValue<Y[K1][K2][K3]>>
  of<K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] >( pathAndDefaultValue: [ [K1, K2, K3, K4]  , PathValue<V[K1][K2][K3][K4]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4]>, PathValue<V[K1][K2][K3][K4]>, PathValue<Y[K1][K2][K3][K4]>>
  of<K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3], K5 extends keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] = keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] >( pathAndDefaultValue: [ [K1, K2, K3, K4, K5]  , PathValue<V[K1][K2][K3][K4][K5]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4][K5]>, PathValue<V[K1][K2][K3][K4][K5]>, PathValue<Y[K1][K2][K3][K4][K5]>>
  of<K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3], K5 extends keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] = keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] , K6 extends keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5] = keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5]>( pathAndDefaultValue: [ [K1, K2, K3, K4, K5, K6]  , PathValue<V[K1][K2][K3][K4][K5][K6]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4][K5][K6]>, PathValue<V[K1][K2][K3][K4][K5][K6]>, PathValue<Y[K1][K2][K3][K4][K5][K6]>>
  of<K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3], K5 extends keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] = keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] , K6 extends keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5] = keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5], K7 extends keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6] = keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6]>( pathAndDefaultValue: [ [K1, K2, K3, K4, K5, K6, K7]  , PathValue<V[K1][K2][K3][K4][K5][K6][K7]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4][K5][K6][K7]>, PathValue<V[K1][K2][K3][K4][K5][K6][K7]>, PathValue<Y[K1][K2][K3][K4][K5][K6][K7]>>
  of<K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3], K5 extends keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] = keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] , K6 extends keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5] = keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5], K7 extends keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6] = keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6], K8 extends keyof Y[K1][K2][K3][K4][K5][K6][K7] & keyof V[K1][K2][K3][K4][K5][K6][K7] = keyof Y[K1][K2][K3][K4][K5][K6][K7] & keyof V[K1][K2][K3][K4][K5][K6][K7]>( pathAndDefaultValue: [[K1, K2, K3, K4, K5, K6, K7, K8]  , PathValue<V[K1][K2][K3][K4][K5][K6][K7][K8]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4][K5][K6][K7][K8]>, PathValue<V[K1][K2][K3][K4][K5][K6][K7][K8]>, PathValue<Y[K1][K2][K3][K4][K5][K6][K7][K8]>>
  of<K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3], K5 extends keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] = keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] , K6 extends keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5] = keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5], K7 extends keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6] = keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6], K8 extends keyof Y[K1][K2][K3][K4][K5][K6][K7] & keyof V[K1][K2][K3][K4][K5][K6][K7] = keyof Y[K1][K2][K3][K4][K5][K6][K7] & keyof V[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof Y[K1][K2][K3][K4][K5][K6][K7][K8] & keyof V[K1][K2][K3][K4][K5][K6][K7][K8] = keyof Y[K1][K2][K3][K4][K5][K6][K7][K8] & keyof V[K1][K2][K3][K4][K5][K6][K7][K8]>( pathAndDefaultValue: [[K1, K2, K3, K4, K5, K6, K7, K8, K9]  , PathValue<V[K1][K2][K3][K4][K5][K6][K7][K8][K9]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4][K5][K6][K7][K8][K9]>, PathValue<V[K1][K2][K3][K4][K5][K6][K7][K8][K9]>, PathValue<Y[K1][K2][K3][K4][K5][K6][K7][K8][K9]>>
  of<K1 extends keyof Y & keyof V = keyof Y & keyof V, K2 extends keyof Y[K1] & keyof V[K1] = keyof Y[K1] & keyof V[K1], K3 extends keyof Y[K1][K2] & keyof V[K1][K2] = keyof Y[K1][K2] & keyof V[K1][K2], K4 extends keyof Y[K1][K2][K3] & keyof V[K1][K2][K3] = keyof Y[K1][K2][K3] & keyof V[K1][K2][K3], K5 extends keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] = keyof Y[K1][K2][K3][K4] & keyof V[K1][K2][K3][K4] , K6 extends keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5] = keyof Y[K1][K2][K3][K4][K5] & keyof V[K1][K2][K3][K4][K5], K7 extends keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6] = keyof Y[K1][K2][K3][K4][K5][K6] & keyof V[K1][K2][K3][K4][K5][K6], K8 extends keyof Y[K1][K2][K3][K4][K5][K6][K7] & keyof V[K1][K2][K3][K4][K5][K6][K7] = keyof Y[K1][K2][K3][K4][K5][K6][K7] & keyof V[K1][K2][K3][K4][K5][K6][K7], K9 extends keyof Y[K1][K2][K3][K4][K5][K6][K7][K8] & keyof V[K1][K2][K3][K4][K5][K6][K7][K8] = keyof Y[K1][K2][K3][K4][K5][K6][K7][K8] & keyof V[K1][K2][K3][K4][K5][K6][K7][K8], K10 extends keyof Y[K1][K2][K3][K4][K5][K6][K7][K8][K9] & keyof V[K1][K2][K3][K4][K5][K6][K7][K8][K9] = keyof Y[K1][K2][K3][K4][K5][K6][K7][K8][K9] & keyof V[K1][K2][K3][K4][K5][K6][K7][K8][K9]>( pathAndDefaultValue: [[K1, K2, K3, K4, K5, K6, K7, K8, K9, K10]  , PathValue<V[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>] ): Lens<Y, V, PathValue<Y[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>, PathValue<V[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>, PathValue<Y[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]>>
  of( pathAndDefaultValue ): any {
    return new Lens( [ pathAndDefaultValue ] )
  }
  map<B>( fn: ( pathValue: A ) => B ): Lens<Y, V, U, L, B> {
    return new Lens<Y, V, U, L, B>( this.mapProgram( ( dataOut: Y ) => fn ) as Programs<Y, V, U, L, B> )
  }

  ap<B>( fab: Lens<Y, V, U, L, ( pathValue: A ) => B> ): Lens<Y, V, U, L, B> {
    return new Lens<Y, V, U, L, B>(
      this.mapProgram( ( data ) => ( pathValue ) => fab.read( data )( pathValue ) ) as Programs<Y, V, U, L, B>,
    )
  }

  chain<B>( fn: ( pathValue: A ) => Lens<Y, V, U, L, B> ): Lens<Y, V, U, L, B> {
    return new Lens<Y, V, U, L, B>( this.chainProgram( ( data ) => fn ) as Programs<Y, V, U, L, B> )
  }

  join<P extends typeof DELETE>( this: Lens<Y, V, U, P, P>, dataIn: Y ): V
  join<P>( this: Lens<Y, V, U, P, P>, dataIn: Y ): V
  // join( dataIn: Y ): V
  join( this: Lens<Y, V, U, L, A>, dataIn ) {
    type Accumelator<_L, _A> =  [ _L, Path, _A ]

    const handleChain = <B>( dataOut: Y , chainHelper: ChainingFn<Y, V, U, L, A, B> , path: Path, defaultValue: A ): Accumelator<V, B> => {
      return pipeline(
        chainHelper( dataOut )( getPathValue( path as [keyof Y], dataOut ) as A ),
        ( _lens ) => [ ( _lens as any ).join( dataOut ), ...head( _lens.program ) as ProgramHead<Y, V, B> ] as Accumelator<V, B>,
      )
    }

    const applyMorphism = <B extends A>( dataOut: Y, fn: MappingFn<Y, A, B>, path: Path, defaultValue: A ): Accumelator<V, A> => [
      lens( path as [keyof Y], fn( dataOut ) as ( pathValue: unknown ) => B, defaultValue, dataOut ) as any as V,
      path,
      defaultValue,
    ]

    const programReducer = <B extends A>( [ dataOut , path , defaultValue ]: Accumelator<Y, A>, item: MapOrChainFn<Y, V, U, L, A, B> | ProgramHead<Y, V, A> ): Accumelator<V, A> => {
      return isFunction( item )
        // item is a function
        ? this.isChainHelper( item )
          ? handleChain( dataOut, item, path, defaultValue ) as Accumelator<V, A>
          : applyMorphism( dataOut, item as MappingFn<Y, A, B>, path, defaultValue ) as Accumelator<V, A>
        // item is an array
        : [ dataOut, head( item as ProgramHead<Y, V, A> ), last( item as ProgramHead<Y, V, A> ) ] as Accumelator<any, A>

    }

    const programHead =  head( this.program )

    return head(
      this.program.reduce(
        programReducer,
        [
          dataIn,
          head( programHead ),
          last( programHead ),
        ],
      ) as Accumelator<V, A>,
    )
  }

  fold<Data extends Y, B>( data: Data, fn: ( pathValue: A ) => B ): Y
  fold<Data extends Y, B>( data: Data ): ( fn: ( pathValue: A ) => B ) => Y
  fold( ...args ) {
    return untypedCurry(
      ( fn, data ) => this.map( fn ).join( data ),
    )( ...args )
  }

  write<Data extends Y, B>( writeValue: A ): ( data: Data ) => Y
  write<Data extends Y, B>( writeValue: A , data: Data ): Y
  write( ...args ) {
    return untypedCurry(
      ( writeValue, data ) => this.fold( data, ( _ ) => writeValue ),
    )( ...args )
  }

  reduce<Data extends Y, B>( fn: ( pathValue: A ) => B ): ( data: Data ) => Y
  reduce<Data extends Y, B>( fn: ( pathValue: A ) => B , data: Data ): Y
  reduce( ...args ) {
    return untypedCurry(
      ( fn, data ) => this.map( fn ).join( data ),
    )( ...args )
  }

  joinAndRead<Data extends Y, B>( data: Data ): [V, A, unknown] {
    const [ path, defaultValue ] = head( this.program )
    const fn = ( a ) => a
    return pipeline(
        this.map( fn ).join( data ),
        ( pData ) => [ pData, getPathValue( path as [keyof V] , pData ), getPathValue( path as [keyof Y], data ) ],
      ) as [V, A, unknown]
  }

  reduceAndRead<Data extends Y, B>( fn: ( pathValue: A ) => B ): ( data: Data ) => V
  reduceAndRead<Data extends Y, B>( fn: ( pathValue: A ) => B , data: Data ): V
  reduceAndRead( ...args ) {
    return untypedCurry(
      ( fn, data ) => this.map( fn ).joinAndRead( data ),
    )
  }

  read<Data extends Y>( data: Data ): A {
    const [ path, defaultValue ] = head( this.program )
    return getPathValue( path as [keyof Y], this.reduce( ( a ) => a , data ) ) as A
  }

  preRead<Data extends Y>( data: Data ) {
    const [ path, defaultValue ] = head( this.program )
    const foo = head( this.program )
    return getPathValue( path as [keyof Y], data )
  }

  private mapProgram<B>( fn: MappingFn<Y, A, B> ): Programs<Y, V, U, L, B> {
    return pipeline(
        last( this.program ) as MapOrChainFn<Y, V, U, L, A, B> | ProgramHead<Y, V, A>,
        ( lastProgram ) => init( this.program ).concat(
        Lens.isComposableLensMorphism( lastProgram )
          ? [ ( dataOut: Y ) => ( pathValue: A ) => fn( dataOut )( lastProgram( dataOut )( pathValue ) )  ]
          : [ lastProgram, fn ],
      ) as Programs<Y, V, U, L, B>,
    )
  }
  private readonly isChainHelper = ( item ): item is ( ( data: Y ) => ( pathValue: A ) => Lens<Y, V, U, L, A> ) =>
    typeof item === 'function'
      && item.name === Lens.chainHelperName

  private getChainHelper<B>( fn: ( data: Y ) => ( pathValue: A ) => Lens<Y, V, U, L, B> ): ChainingFn<Y, V, U, L, A, B> {
    const that = this
    return defineFunctionProperties(
      function chainHelper( data ) {
        return ( pathValue: A ) => fn( data )( pathValue )
      },
      { name: Lens.chainHelperName },
    )
  }

  private chainProgram<B>( fn: ( data: Y ) => ( pathValue: A ) => Lens<Y, V, U, L, B> ): Programs<Y, V, U, L, B> {
    return this.program.concat( this.getChainHelper( fn ) ) as Programs<Y, V, U, L, B>
  }

}

// declare module 'fp-ts/lib/HKT' {
//   interface URI2HKT3<U,L,A> {
//     'babakness/lens': Lens<U,L,A>,
//   }
// }
