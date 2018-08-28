import { Predicate } from './helper-types'
export const mapEntryValues = <VA,VB>(fn: (a: VA) => VB) => <K>(entries: [K,VA][]): [K,VB][] => entries.map( ([k,v]) => [k,fn(v)] as [K,VB])
export const mapEntryKeys = <KA,KB>(fn: (a: KA) => KB) => <V>(entries: [KA,V][]): [KB,V][] => entries.map( ([k,v]) => [fn(k),v] as [KB,V])
export const filterEntryValues = <V>(fn: Predicate<V>) => <K>(entries: [K,V][]): [K,V][] => entries.filter( ([k,v]) => fn(v))
export const filterEntryKeys = <K>(fn: Predicate<K>) => <V>(entries: [K,V][]): [K,V][] => entries.filter( ([k,v]) => fn(k))
