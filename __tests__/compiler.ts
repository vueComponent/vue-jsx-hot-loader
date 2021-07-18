import path from 'path'
import webpack from 'webpack'
import { createFsFromVolume, Volume } from 'memfs'
interface Options {}

export default (fixture: string, options: Options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: ['@vue/babel-plugin-jsx'],
              },
            },
            {
              loader: path.resolve(__dirname, '../src/index'),
              options,
            },
          ],
        },
      ],
    },
  })

  compiler.outputFileSystem = createFsFromVolume(new Volume())
  compiler.outputFileSystem.join = path.join.bind(path)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      if (!stats) reject(new Error())

      resolve(stats)
    })
  })
}
