const { fromEntries, keys } = Object

type SetValueEntry = [string, (value: any) => void]
type Entry = [string, (...args: any[]) => void]

type Obj = Record<string, any>
type Func = (key: string) => Entry

type Target = {
  [key: string]: any
}

export const setValue = (target: Target) =>
  (key: string): SetValueEntry => [
    key,
    function (value: any): void {
      target[key] = value
    },
  ]

export default (obj: Obj, func: Func): Obj =>
  fromEntries(keys(obj).map(func))
