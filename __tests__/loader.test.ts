import compiler from './compiler';
import { resolve } from 'path';

describe('vue-jsx-hot-loader test cases', () => {

  it('should work with export default in jsx', async () => {
    const A = await compiler(resolve(__dirname, '../example/A.jsx'));
    expect(A).toMatchSnapshot();
  });

  it('should work with export default referencing variable declaration', async () => {
    const App = await compiler(resolve(__dirname, '../example/App.jsx'));
    expect(App).toMatchSnapshot();
  });

  it('should work with named exports', async () => {
    const B = await compiler(resolve(__dirname, '../example/B.jsx'));
    expect(B).toMatchSnapshot();
  });

  it('should work with export default in tsx', async () => {
    const C = await compiler(resolve(__dirname, '../example/D.tsx'));
    expect(C).toMatchSnapshot();
  });
});
