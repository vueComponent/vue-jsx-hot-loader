import compiler from './compiler'
import { resolve } from 'path'

describe('vue-jsx-hot-loader test cases', () => {
  it('file A should be transformed right', async () => {
    const A = await compiler(resolve(__dirname, '../example/A.jsx'))
    expect(A).toMatchSnapshot()
  })
  it('file App should be transformed right', async () => {
    const App = await compiler(resolve(__dirname, '../example/App.jsx'))
    expect(App).toMatchSnapshot()
  })
  it('file B should be transformed right', async () => {
    const B = await compiler(resolve(__dirname, '../example/B.jsx'))
    expect(B).toMatchSnapshot()
  })
  it('file C should be transformed right', async () => {
    const C = await compiler(resolve(__dirname, '../example/C.tsx'))
    expect(C).toMatchSnapshot()
  })
  it('file t should be transformed right', async () => {
    const t = await compiler(resolve(__dirname, '../example/t.ts'))
    expect(t).toMatchSnapshot()
  })
})
