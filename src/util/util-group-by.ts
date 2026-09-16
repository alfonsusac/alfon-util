export function groupBy<T, K extends string | number>(
  arr: T[],
  keyGetter: (r: T) => K,
) {
  return Object
    .entries(Object.groupBy(arr, keyGetter))
    .map((e) => {
      if (e[ 1 ] === undefined)
        throw new Error(`No Value after grouping. Key: ${ e[ 0 ] }`)
      return {
        key: e[ 0 ] as K,
        items: e[ 1 ] as T[]
      }
    })
}













export const meta: Meta = {
  examples: [
    {
      name: '',
      code: (console) => {
        const users = [
          { name: 'Alice', role: 'admin' as const },
          { name: 'Bob', role: 'user' as const },
          { name: 'Charlie', role: 'admin' as const },
        ]
        const grouped = groupBy(users, user => user.role)
        console.log(grouped)
      }
    },
    {
      name: 'Composite Key',
      code: (console) => {
        const products = [
          { name: 'Apple', category: 'fruit' },
          { name: 'Carrot', category: 'vegetable' },
          { name: 'Banana', category: 'fruit' },
        ]
        const grouped = groupBy(products, product => product.category)
        console.log(grouped)
      }
    },
    {
      name: 'Non string key',
      code: (console) => {
        const items = [
          { name: 'Alice', team: 1 },
          { name: 'Bob', team: 2 },
          { name: 'Charlie', team: 1 },
        ]
        const grouped = groupBy(items, item => item.team)
        console.log(grouped)
      }
    },
    {
      name: 'Empty array',
      code: (console) => {
        const grouped = groupBy([], item => item)
        console.log(grouped)
      }
    }
  ]
}



