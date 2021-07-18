import compiler from './compiler'
import { resolve } from 'path'
import { Stats } from 'webpack'

describe('vue-jsx-hot-loader', () => {
  test('Inserts name and outputs JavaScript', async () => {
    const stats = (await compiler(resolve(__dirname, '../example/App.jsx'))) as Stats
    if (stats === undefined) {
      throw Error
    } else {
      const output = stats.toJson({ source: true }).modules[0].source

      expect(output).toMatchSnapshot()
    }
  })
})
