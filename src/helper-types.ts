
export enum adtn {
  ap = 'babakness/ap',
  map = 'babakness/map',
  chain = 'babakness/chain',
  flatMap = 'babakness/flatMap',
}


Array.prototype[adtn.chain] = function(fn) {
  return this.reduce( (acc,item) => acc.concat(fn(item)) ,[])
}

Array.prototype[adtn.ap]  = function(arr) { // Apply
  return arr[adtn.chain](fn => this.map( fn ));
}
Array.of = function(val) { // Applicative
  return [val];
}


declare global {
  interface ArrayConstructor {
    _URI: 'Array'
  }
  interface Array<T> {
    [adtn.ap]: <U>(a: any) => Array<U>,
    of: Array<T>,
  }
}



export type EntryKeyValue<A> = A extends [infer KEY,infer VALUE] ? [KEY,VALUE] : undefined
export type EntryKey<A> = A extends [infer KEY,infer VALUE] ? KEY : undefined
export type EntryValue<A> = A extends [infer KEY,infer VALUE] ? VALUE : undefined


// Types used in project
export type Flat = number|string|symbol
export type Entry<A> = [Flat,A][]
export type Obj<T> = { [k: string]: T }
export type Predicate<A> = (x: A) => boolean
export type Predicate2<A,B> = (x: A, y:B) => boolean
export type Complement<T extends boolean> = Exclude<boolean,T> extends never ? boolean : Exclude<boolean,T>
export type FlattenArray<T> = T extends any[][] ? T[number] : T;


export type Function1<A, B> = (a: A) => B
export type Function2<A, B, C> = (a: A, b: B) => C
export type Function3<A, B, C, D> = (a: A, b: B, c: C) => D
export type Function4<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E
export type Function5<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E) => F
export type Function6<A, B, C, D, E, F, G> = (a: A, b: B, c: C, d: D, e: E, f: F) => G
export type Function7<A, B, C, D, E, F, G, H> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H
export type Function8<A, B, C, D, E, F, G, H, I> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => I
export type Function9<A, B, C, D, E, F, G, H, I, J> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => J

export type FunctionV<A,B> = (...a: A[]) => B

export type Function_21<A, B, C, D> = (a: A, b: B) => (c: C) => D
// export type Function_12<A, B, C, D> = (a: A) =>  (b: B, c: C) => D
export type Function_211<A, B, C, D, E> = (a: A, b: B) => (c: C) => (d: D) => E
export type Function_22<A, B, C, D, E> = (a: A, b: B) => (c: C, d: D) => E
export type Function_31<A, B, C, D, E> = (a: A, b: B, c: C) => (d: D) => E
// export type Function_22<A, B, C, D, E> = (a: A, b: B) => (c: C, d: D) => E
// export type Function_121<A, B, C, D, E> = (a: A) => ( b: B, c: C) => (d: D) => E
// export type Function_112<A, B, C, D, E> = (a: A) => ( b: B ) => (d: D) => E
// export type Function_13<A, B, C, D, E> = (a: A) => (b: B, c: C, d: D) => E
export type Function_2111<A, B, C, D, E, F> = (a: A, b: B) => (c: C) => (d: D) => (e:E) => F
export type Function_311<A, B, C, D, E, F>  = (a: A, b: B, c: C) => (d: D) => (e:E) => F
export type Function_41<A, B, C, D, E, F>   = (a: A, b: B, c: C, d: D) => (e:E) => F
export type Function_51<A, B, C, D, E, F, G>   = (a: A, b: B, c: C, d: D, e: E) => (f:F) => G
export type Function_61<A, B, C, D, E, F, G, H>   = (a: A, b: B, c: C, d: D, e: E, f:F) => (g:G) => H

export type Curried2<A, B, C> = (a: A) => (b: B) => C
export type Curried3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D
export type Curried4<A, B, C, D, E> = (a: A) => (b: B) => (c: C) => (d: D) => E
export type Curried5<A, B, C, D, E, F> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F
export type Curried6<A, B, C, D, E, F, G> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => G
export type Curried7<A, B, C, D, E, F, G, H> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => H
export type Curried8<A, B, C, D, E, F, G, H, I> = ( a: A ) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => I
export type Curried9<A, B, C, D, E, F, G, H, I, J> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => J


export interface Functor<A> {
  map<B>(fn: Function1<A,B>): Functor<B>;
}

export interface Apply<A> extends Functor<A>{
  ap<B>(fn: Apply< (a:A) => B>): Apply<B>;
}

export interface ArrayApply<A> extends Functor<A>{
  [adtn.ap]<B>(fn: Apply< (a:A) => B>): ArrayApply<B>;
}

export interface Applicative<A> {
  of(val: A): Apply<A>
}

export interface Applicative<A> {
  of(val: A): Apply<A>
}

export interface ArrayApplicative<F,A> {
  _URI: F
  of(val: A): ArrayApply<A>
}

export interface Filterable<A> {
  filter(fn: Predicate<A>): Filterable<A>;
}

export interface HKT0<F> {
  readonly _URI: F
}


export interface Pushable<A> {
  readonly concat: (item: A) => Pushable<A>
}

export interface Concattable<A> {
  readonly concat: (item: A) => Concattable<A>
}