import path from 'path'
import webpack, { Stats } from 'webpack'
import memoryfs from 'memory-fs'
interface Options {}

export default (fixture: string, options: Options = {}): Promise<Stats> => {
  const compiler = webpack({
    context: __dirname,
    entry: fixture,
    mode: 'development',
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: ['@vue/babel-plugin-jsx'],
              },
            },
            {
              loader: path.resolve(__dirname, '../src/index.ts'),
              options,
            },
          ],
        },
      ],
    },
  })

  compiler.outputFileSystem = new memoryfs()

  return new Promise<webpack.Stats>((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      if (stats) {
        resolve(stats)
      } else {
        reject()
      }
    })
  })
}
