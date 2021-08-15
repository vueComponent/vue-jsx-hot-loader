import path from 'path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';

export default (fixture: string): Promise<string | undefined> => {
  const compiler = webpack({
    context: __dirname,
    entry: fixture,
    mode: 'development',
    output: {
      path: '/',
      filename: 'test.bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-typescript'],
                plugins: ['@vue/babel-plugin-jsx'],
              },
            },
            {
              loader: path.resolve(__dirname, '../src/index.ts'),
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.jsx', '.tsx', '.ts', '.js'],
    },
  });

  const mfs = createFsFromVolume(new Volume());
  compiler.outputFileSystem = mfs;
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve) => {
    compiler.run((err, stats) => {
      expect(err).toBeNull();
      if (stats?.hasErrors()) {
        return console.error(stats.toString('errors-only'));
      }
      expect(stats?.hasErrors()).toBeFalsy();
      if (!stats) {
        console.error('stats is undefined');
      } else {
        const modules = stats.toJson({ source: true }).modules;
        if (!modules) {
          console.error('modules is undefined');
        }
        expect(modules).not.toBeUndefined();
        if (modules) {
          resolve(modules[0].source?.toString());
        }
      }
    });
  });
};
