const { fromEntries, keys } = Object

export const setValue =
  (target: Record<string, any>) =>
  (key: string): [string, (value: any) => void] => [
    key,
    function (value: any): void {
      target[key] = value
    },
  ]

export default (obj: Record<string, any>, func: (key: string) => [string, any]): Record<string, any> =>
  fromEntries(keys(obj).map(func))
