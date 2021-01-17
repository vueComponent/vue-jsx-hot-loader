import * as webpack from 'webpack';
import hash from 'hash-sum';
import * as path from 'path';
import * as loaderUtils from 'loader-utils';
import * as t from '@babel/types';
import traverse from '@babel/traverse';
import { File } from '@babel/types'
import { parse } from '@babel/parser';
import { isDefineComponentCall, parseComponentDecls } from './utils';

const hasJSX = (file: File) => {
  let fileHasJSX = false;
  traverse(file, {
    JSXElement(path) {
      fileHasJSX = true;
      path.stop();
    },
    JSXFragment(path) {
      fileHasJSX = true;
      path.stop();
    },
  });

  return fileHasJSX;
};

export default function loader(
  this: webpack.loader.LoaderContext,
  source: string,
) {
  const loaderContext = this;
  loaderContext.cacheable?.();

  const isDev = loaderContext.mode === 'development';

  if (!isDev) {
    return source;
  }

  const file = parse(source, { sourceType: 'module', plugins: ['jsx', 'typescript'] });

  if (!hasJSX(file)) {
    return source;
  }

  const webpackRemainingChain = loaderUtils.getRemainingRequest(loaderContext).split('!');
  const fullPath = webpackRemainingChain[webpackRemainingChain.length - 1];
  const filename = path.relative(process.cwd(), fullPath);

  const declaredComponents: { name: string }[] = [];
  const hotComponents: {
    local: string;
    id: string;
  }[] = [];
  let defaultIdentifier: t.Identifier | null = null;

  traverse(file, {
    VariableDeclaration(nodePath) {
      declaredComponents.push(...parseComponentDecls(nodePath.node));
    },
    ExportNamedDeclaration(nodePath) {
      const { specifiers = [], declaration } = nodePath.node;
      if (t.isVariableDeclaration(declaration)) {
        hotComponents.push(...parseComponentDecls(declaration).map(({ name }) => ({
          local: name,
          id: hash(`${filename}-${name}`),
        })));
      } else if (specifiers.length) {
        for (const spec of specifiers) {
          if (t.isExportSpecifier(spec) && t.isIdentifier(spec.exported)) {
            if (declaredComponents.find(d => d.name === spec.local.name)) {
              hotComponents.push({
                local: spec.local.name,
                id: hash(`${filename}-${spec.exported.name}`)
              });
            }
          }
        }
      }
    },
    ExportDefaultDeclaration(nodePath) {
      const { declaration } = nodePath.node;
      if (t.isIdentifier(declaration)) {
        if (declaredComponents.find(d => d.name === declaration.name)) {
          hotComponents.push({
            local: declaration.name,
            id: hash(`${filename}-default`)
          })
        }
      } else if (isDefineComponentCall(declaration)) {
        defaultIdentifier = nodePath.scope.generateUidIdentifier('default')
        hotComponents.push({
          local: defaultIdentifier.name,
          id: hash(`${filename}-default`)
        });
      }
    }
  });

  if (hotComponents.length) {
    if (defaultIdentifier) {
      const { name } = defaultIdentifier as t.Identifier;
      source = source.replace(
        /export default defineComponent/g,
        `const ${name} = defineComponent`
      ) + `\nexport default ${name}`
    }

    let callbackCode = '';
    for (const { local, id } of hotComponents) {
      source +=
        `\n${local}.__hmrId = '${id}'` +
        `\n__VUE_HMR_RUNTIME__.createRecord('${id}', ${local})`
      callbackCode += `\n__VUE_HMR_RUNTIME__.reload("${id}", ${local})`
    }

    source +=
      `\n/* hot reload */` +
      `\nif (module.hot) {` +
      `\n  module.hot.accept()` +
      `\n  ${callbackCode}` +
      `\n}`
  }

  return source;
};
