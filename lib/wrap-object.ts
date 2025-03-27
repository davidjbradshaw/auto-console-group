const { fromEntries, keys } = Object

export type Entry = [string, (...args: any[]) => void]
type ValueEntry = [string, (value: any) => void]

type Obj = Record<string, any>
type Func = (key: string) => Entry

type Target = {
  [key: string]: any
}

export const setValue = (target: Target) =>
  (key: string): ValueEntry => [
    key,
    function (value: string | boolean): void {
      target[key] = value
    },
  ]

export default (obj: Obj, func: Func): Obj =>
  fromEntries(keys(obj).map(func))
