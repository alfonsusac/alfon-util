export function prefixKeys<T extends object, P extends string>(obj: T, prefix: P) {
  const res = Object.fromEntries(
    Object.entries(obj).map(([ key, value ]) => {
      return [ `${ prefix }${ key }`, value ]
    })
  )
  return res as {
    [ key in keyof T  as `${ P }${ key & (string | number) }` ]: T[ key ]
  }
}













export const meta: Meta = {
  details: `- Symbol keys are not preserved`,
  examples: [
    {
      name: 'CSS variables',
      code: console => {
        const css_styles = {
          color: 'red',
          background: 'white',
          padding: '1rem'
        }
        console.log(prefixKeys(css_styles, '--'))

        const env_config = {
          host: 'localhost',
          port: 3000
        }
        console.log(prefixKeys(env_config, 'APP_'))
      }
    },
    {
      name: 'Non text keys',
      code: console => {
        const id = Symbol('id')

        const obj = {
          1: 'one',
          2: 'two',
          [ id ]: 'secret'
        }

        console.log(prefixKeys(obj, 'key_'))
      }
    },
  ]
}