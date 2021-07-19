import compiler from './compiler'
import { resolve } from 'path'

describe('vue-jsx-hot-loader test cases', () => {
  it('file A should be transform right', async () => {
    const stats = await compiler(resolve(__dirname, '../example/A.jsx'))
    // @ts-ignore
    const output = stats.toJson({ source: true }).modules[0].source
    expect(output).toMatchSnapshot()
  })
  it('file B should be transform right', async () => {
    const stats = await compiler(resolve(__dirname, '../example/B.jsx'))
    // @ts-ignore
    const output = stats.toJson({ source: true }).modules[0].source
    expect(output).toMatchSnapshot()
  })
  it('file C should be transform right', async () => {
    const stats = await compiler(resolve(__dirname, '../example/C.tsx'))
    // @ts-ignore
    const output = stats.toJson({ source: true }).modules[0].source
    expect(output).toMatchSnapshot()
  })
  it('file App should be transform right', async () => {
    const stats = await compiler(resolve(__dirname, '../example/App.jsx'))
    //@ts-ignore
    const output = stats.toJson({ source: true }).modules[0].source
    expect(output).toMatchSnapshot()
  })
  it('file t.ts should be transform right', async () => {
    const stats = await compiler(resolve(__dirname, '../example/t.ts'))
    //@ts-ignore
    const output = stats.toJson({ source: true }).modules[0].source
    expect(output).toMatchSnapshot()
  })
})
